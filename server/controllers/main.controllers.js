//user 테이블 객체 생성
const { sequelize } = require("../models");
const db = require("../models");
const User = require("../models/user");
const Post = require("../models/post");
db.User = User;
db.Post = Post;

// Web3 객체 생성
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)

//JWT
const jwt = require("jsonwebtoken");

require("dotenv").config();

// 렌더링 페이지
const main = async (req, res) => {
  let topicsArr = [];
  const topics = await Post.findAll({
    attributes: ["title", "img_url", "content", "created_at", "user_id","id"],
  });
  topics.forEach((element) => {
    topicsArr.push(element.dataValues);
  });
  res.status(200).send(topics);
};

const faucet = async (req, res) => {
  console.log(req.params.address);

  //accessToken 검증
  if (req.headers.authorization) {
    // 헤더 정보 있
    const token = req.headers.authorization.replace(/^Bearer\s+/, "");

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(404).json({ message: "invalid access token" });
      } else {
        // 인증 완료
        console.log(decoded);
        //Faucet
        //트랜잭션 서명
        const signedTx = await web3.eth.accounts.signTransaction(
          {
            to: decoded.address,
            value: web3.utils.toWei("0.1", "ether"),
            gas: "21000",
          },
          "0x" + process.env.HW_FAUCET_PRIVATE_KEY
        ); // 이부분은 로컬이라 각 Ganache 두번째 계정 PK env에 넣어주시면 됩니다~

        console.log(signedTx);

        //서명한 트랜잭션 전송
        await web3.eth
          .sendSignedTransaction(signedTx.rawTransaction)
          .then(function (receipt) {
            console.log(receipt);
          })
          .catch(function (error) {
            console.log(error);
          });

        // 잔액 확인(ETH)
        const userBalance = await web3.eth.getBalance(decoded.address);
        var userBalance_eth = await web3.utils.fromWei(userBalance, "ether");
        console.log(Number(userBalance_eth).toFixed(4));

        //DB에 잔액 업데이트
        await User.update(
          {
            eth_amount: Number(userBalance_eth).toFixed(4),
          },
          {
            where: { address: decoded.address },
          }
        );

        return res.status(200).json({ message: "success" });
      }
    });
  } else {
    return res.status(404).json({ message: "invalid access token" });
  }
};

module.exports = { main, faucet };
