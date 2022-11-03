//DB - Model
const { sequelize } = require("../models");
const db = require("../models");
const NFT = require("../models/nft");
db.NFT = NFT;
NFT.init(sequelize);
const User = require('../models/user');
db.User = User;
User.init(sequelize);

const jwt = require('jsonwebtoken');
require('dotenv').config();

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // 가나슈와 연동(로컬)
const Tx = require('ethereumjs-tx').Transaction;

//Truffle로 배포한 컨트랙 정보 읽어오기
// 선행 작업 : 터미널에서 truffle --reset
//로컬에서 배포시 Address가 다 다르기 때문에 ABI, Address 파일 형태로 저장하도록 했습니다! -> contract/2_initial_migration.js 확인하시면 됩니다!
const fs = require('fs');
// ERC20
var DEPLOYED_ABI_20 = JSON.parse(fs.readFileSync('../contract/20deployedABI', 'utf8'));
var DEPLOYED_ADDRESS_20 = fs.readFileSync('../contract/20deployedAddress', 'utf8').replace(/\n|\r/g, "");
const Contract20 = new web3.eth.Contract(DEPLOYED_ABI_20,DEPLOYED_ADDRESS_20);

// ERC20
var DEPLOYED_ABI_721 = JSON.parse(fs.readFileSync('../contract/721deployedABI', 'utf8'));
var DEPLOYED_ADDRESS_721 = fs.readFileSync('../contract/721deployedAddress', 'utf8').replace(/\n|\r/g, "");
const Contract721 = new web3.eth.Contract(DEPLOYED_ABI_721,DEPLOYED_ADDRESS_721);

//IPFS
//ipfs-api 사용
var ipfsAPI = require('ipfs-api');

// connect to ipfs daemon API server
const auth =
    'Basic ' + Buffer.from(process.env.IPFS_PROJECT_ID + ':' + process.env.IPFS_API_KEY).toString('base64');
const ipfs = ipfsAPI({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
      authorization: auth,
  },
})


const getNftLists = async (req, res) => {
  let nftArr = [];
  const nfts = await NFT.findAll({
    attributes: ["token_id", "tx_hash", "token_uri", "price", "isSelling"],
  });
  nfts.forEach((element) => {
    nftArr.push(element.dataValues);
  });
};

const mintNft = async (req, res) => {
  console.log(req.body);

    const {imgUrl, name, description, privateKey} = req.body;

    //accessToken 검증
    if(req.headers.authorization) { // 헤더 정보 있
        const token = req.headers.authorization.replace(/^Bearer\s+/, "");
    
        jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded)=> {
          if(err) {
            return res.status(404).json({ message1: "invalid access token"})
          } else { // 인증 완료

            //Minting
            try {
                // Minting 비용 검사 : Minting Cost == 100 ERC20Token
                const tokenBalanceCheck = await Contract20.methods.balanceOf(decoded.address).call()
                if(tokenBalanceCheck < 100) { 
                    return res.status(404).json({ message2: "Can’t execute request"})
                }

                //20 : allowance확인 : msg.sender(minting contract)가 sender(client)로부터 양도 받았는지
                const allowanceCheck = await Contract20.methods.allowance(decoded.address,DEPLOYED_ADDRESS_721).call();
                //mintcontract에 양도한 토큰이 부족할 경우 
                if(allowanceCheck < 100) {
                  // 20 : approve => minting contract에게 100토큰(minting cost) 승인
                  await approve(decoded.address,privateKey);

                  //20 : 다시 allowance확인 : msg.sender(minting contract)가 sender(client)로부터 양도 받았는지
                  const allowanceCheck = await Contract20.methods.allowance(decoded.address,DEPLOYED_ADDRESS_721).call();
                  
                  // 양도가 성공적으로 안되었을 경우
                  if(allowanceCheck < 100) {
                    return res.status(404).json({ message2: "Can’t execute request"})
                  }
                }

                //선행작업으로 setToken 필요 : 서버계정으로 => 수동처리해도 상관없.
                await setToken();

                //양도가 완료되면 minting 진행 : sender == 서버 계정, recipient가 사용자 address
                const newNFTData = await minting(decoded.address, imgUrl, name, description);
                console.log(newNFTData)

                //minting완료시 DB업데이트(NFT, 토큰 잔액, 이더)
                //NFT
                const userIdSearch = await User.findOne({ where: { address : decoded.address  } });
                newNFTData["user_id"] = userIdSearch.dataValues.id;
                const tokenId = await Contract721.methods.getTokenId().call();
                newNFTData["token_id"] = tokenId;
                console.log(newNFTData)
                const newNFT = await NFT.create(newNFTData);

                //토큰 잔액, 이더
                const tokenBalance = await Contract20.methods.balanceOf(decoded.address).call()
                const etherBalance = await web3.eth.getBalance(decoded.address);
                var userBalance_eth = await web3.utils.fromWei(etherBalance, "ether");
                console.log(Number(userBalance_eth).toFixed(4));
                await User.update(
                  {
                    eth_amount: Number(userBalance_eth).toFixed(4),
                    token_amount: tokenBalance
                  },
                  {
                    where: { address: decoded.address },
                  }
                );

                if(newNFT != null) {
                  return res.status(200).json({ message: "success", data : {token_id : newNFTData.token_id, token_amount : tokenBalance }})
                } else {
                  return res.status(404).json({ message2: "Can’t execute request"})
                }

            } catch(e) {
                console.log("Invaild TX")
                console.log(e)
                return res.status(404).json({ message2: "Can’t execute request"})
            }


          }
        })
      }
    else {
        return res.status(404).json({message: "invalid access token"})
    }
    




};

const detailNft = async (req, res) => {
  let id = req.body.nid;
  const nft = await NFT.findOne({
    where: { id },
  });
  res.status(200).send(nft);
};

const sellNft = (req, res) => {};

const buyNft = (req, res) => {};


async function approve(owner, private_key) {
  //네트워크 가스비 책정
  var gasPrice = await web3.eth.getGasPrice(function(error, result) {  
    return result;
  });

  // sender의 이더 조회
  var balance = await web3.eth.getBalance(owner);

  console.log(gasPrice, balance);

  // sender가 충분한 가스비가 없을 경우
  if(parseInt(gasPrice) > parseInt(balance)) {
    return;
  }

  //SignTX를 위한 Buffer형태로 변환
  const privateKey = private_key.substr(2);
  console.log(privateKey);
  const privateKey_B = Buffer.from(privateKey,'hex');

  //컨트랙에서 넌스값 구하기
  const accountNonce = '0x' + (await web3.eth.getTransactionCount(owner)).toString(16); 

  //트랜잭션 데이터 생성
  const rawTx =
  {
      nonce: accountNonce,
      from: owner,
      to: DEPLOYED_ADDRESS_20, // 컨트랙에게 전송
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: 500000,
      value: '0x0',
      // 컨트랙 함수 실행
      data: Contract20.methods.approve(DEPLOYED_ADDRESS_721,100).encodeABI()
  }; 

    // 트랜잭션 생성 및 서명 
    var tx = new Tx(rawTx);
    tx.sign(privateKey_B);
    var serializedTx = '0x' + tx.serialize().toString('hex');

    var txHash;
    // 서명 및 전송
    await web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
    .then(function (receipt) {
      console.log(receipt)
      return;
    })
    .catch(function (error) {
        console.log(error)
        return;
    })
}

async function setToken() {
  // 서버 계정 : 721 contract 배포자(onlyOwner)
  const accounts = await web3.eth.getAccounts();
  const serverAccount = accounts[0];
  console.log(serverAccount)

  //네트워크 가스비 책정
  var gasPrice = await web3.eth.getGasPrice(function(error, result) {  
    return result;
  });

  // sender의 이더 조회
  var balance = await web3.eth.getBalance(serverAccount);

  console.log(gasPrice, balance);

  // sender가 충분한 가스비가 없을 경우
  if(parseInt(gasPrice) > parseInt(balance)) {
    return;
  }

  //SignTX를 위한 Buffer형태로 변환
  const privateKey_B = Buffer.from(process.env.HW_FAUCET_PRIVATE_KEY,'hex');

  //컨트랙에서 넌스값 구하기
  const accountNonce = '0x' + (await web3.eth.getTransactionCount(serverAccount)).toString(16); 

  //트랜잭션 데이터 생성
  const rawTx =
  {
      nonce: accountNonce,
      from: serverAccount,
      to: DEPLOYED_ADDRESS_721, // 컨트랙에게 전송
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: 500000,
      value: '0x0',
      // 컨트랙 함수 실행
      data: Contract721.methods.setToken(DEPLOYED_ADDRESS_20).encodeABI()
  }; 

    // 트랜잭션 생성 및 서명 
    var tx = new Tx(rawTx);
    tx.sign(privateKey_B);
    var serializedTx = '0x' + tx.serialize().toString('hex');

    var txHash;
    // 서명 및 전송
    await web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
    .then(function (receipt) {
      console.log(receipt)
      return;
    })
    .catch(function (error) {
        console.log(error)
        return;
    })
}

async function minting(recipient, imgUrl, name, description) {
  // 서버 계정 : 721 contract 배포자(onlyOwner)
  const accounts = await web3.eth.getAccounts();
  const serverAccount = accounts[0];
  console.log(serverAccount)

  //네트워크 가스비 책정
  var gasPrice = await web3.eth.getGasPrice(function(error, result) {  
    return result;
  });

  // sender의 이더 조회
  var balance = await web3.eth.getBalance(serverAccount);

  console.log(gasPrice, balance);

  // sender가 충분한 가스비가 없을 경우
  if(parseInt(gasPrice) > parseInt(balance)) {
    return;
  }

  //SignTX를 위한 Buffer형태로 변환
  const privateKey_B = Buffer.from(process.env.HW_FAUCET_PRIVATE_KEY,'hex');

  //컨트랙에서 넌스값 구하기
  const accountNonce = '0x' + (await web3.eth.getTransactionCount(serverAccount)).toString(16); 

  //TokenURI Set
  const metaData = {
    name : name,
    description : description,
    image : imgUrl
  }
  const buffer = Buffer.from(JSON.stringify(metaData)); //ipfs 업로드를 위한 파일화
  const added = await ipfs.add(buffer);
  const tokenURI = `https://bebproject2.infura-ipfs.io/ipfs/${added[0].path}`;


  //트랜잭션 데이터 생성
  const rawTx =
  {
      nonce: accountNonce,
      from: serverAccount,
      to: DEPLOYED_ADDRESS_721, // 컨트랙에게 전송
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: 500000,
      value: '0x0',
      // 컨트랙 함수 실행
      data: Contract721.methods.mintNFT(recipient,tokenURI).encodeABI()
  }; 

    // 트랜잭션 생성 및 서명 
    var tx = new Tx(rawTx);
    tx.sign(privateKey_B);
    var serializedTx = '0x' + tx.serialize().toString('hex');

    const newNFTData = {
      tx_hash : "",
      token_uri : tokenURI,
      price : 0,
      isSelling : null
    }
    // 서명 및 전송
    await web3.eth.sendSignedTransaction(serializedTx.toString('hex'))
    .then(async function (receipt) {
      newNFTData.tx_hash = receipt.transactionHash;
    })
    .catch(function (error) {
        console.log(error)
        return;
    })
    return newNFTData;
}

module.exports = {
  getNftLists,
  mintNft,
  detailNft,
  sellNft,
  buyNft,
};
