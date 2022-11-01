//user 테이블 객체 생성
const { sequelize } = require('../models');
const db = require('../models');
const User = require('../models/user');
db.User = User;
User.init(sequelize);

const jwt = require('jsonwebtoken');
require('dotenv').config();


const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545')); // 가나슈와 연동(로컬)

const userInfo = async (req, res) => {
    console.log(req.params.uid)

    // 유저 정보
    const user = await User.findOne({
        where: {
            login_id : req.params.uid
        }
    });
    if(user == null) {
        return res.status(404).json({data : null});
    }


    var userInfo = user.dataValues;

    // 포스팅 정보
    const posts = await user.getPosts();
    var postInfo_arr = [];
    posts.forEach(element => {
        postInfo_arr.push(element.dataValues);
    });
    console.log(postInfo_arr)

    // NFT 정보
    const nfts = await user.getNFTs();
    var nftInfo_arr = [];
    nfts.forEach(element => {
        nftInfo_arr.push(element.dataValues);
    });
    console.log(nftInfo_arr)

    
    return res.status(200).json({message: "success", 
        data : {
            userData : userInfo,
            postData : postInfo_arr,
            nftData : nftInfo_arr
        }
    });

};

const join = async (req, res) => {

    //DB에 넣기
    console.log(req.body)
    const {user_id,nickname, password} = req.body;

    // Create a new user
    var userData  = { 
        login_id: user_id,
        nickname: nickname,
        password: password,
        address: "",
        token_amount : 0,
        eth_amount : 0 
    }

    //이미 있는 login_id 검사
    const loginIdSearch = await User.findOne({ where: { login_id : user_id } });
    if (loginIdSearch != null) {
        return res.status(400).json({message1 : "userId already exists"});
    }   

    //이미 있는 nickname 검사
    const nicknameSearch = await User.findOne({ where: { nickname : nickname } });
    if (nicknameSearch != null) {
        return res.status(400).json({message2 : "nickname already exists"});
    }   

    //블록체인 계정 생성 및 잔액 userData에 업데이트 : smartContract 작업 후 추가 예정
    const accounts = await web3.eth.getAccounts(); // web3를 활용하여 Ganache 계정 가져오기
    const new_account = await web3.eth.personal.newAccount(password);
    userData.address = new_account;

    console.log(userData)
    console.log(await web3.eth.getAccounts())

    //DB Insert
    const newUser = await User.create(userData);
    
    // newUser가 성공적으로 insert 되었을 경우, JWT 발급
    if(newUser != null) {
        delete userData.password; // 패스워드 제외

        //jwt
        var accessToken = jwt.sign(
            userData,
            process.env.ACCESS_SECRET,{
            expiresIn: '5m'
        });
        var refreshToken = jwt.sign(
            userData,
            process.env.REFRESH_SECRET, {
            expiresIn: '5m'
            }
        )


        res.cookie('refreshToken',refreshToken)
    }


    return res.status(200).json({message: "success", accessToken : accessToken});
};

const login =  async (req, res) => {
    console.log(req.body);

    const {user_id, password} = req.body;

    //이미 있는 login_id 검사
    const loginIdSearch = await User.findOne({ where: { login_id : user_id } });
    // console.log(loginIdSearch.dataValues)

    if (loginIdSearch != null) { // 해당 user_id가 있을 경우

        var userData  = {}; // 유저 정보 담을 객체
        userData = loginIdSearch.dataValues;

        if(userData.password === password) { // 비밀번호 일치

            delete userData.password; // 비밀번호 제외

            //JWT 발급
            var accessToken = jwt.sign(
                userData,
                process.env.ACCESS_SECRET,{
                expiresIn: '5m'
            });
            var refreshToken = jwt.sign(
                userData,
                process.env.REFRESH_SECRET, {
                expiresIn: '5m'
                }
            )

            res.cookie('refreshToken',refreshToken)

            return res.status(200).json({message: "success", accessToken : accessToken});

        } else { // 비밀번호 불일치
            return res.status(400).json({message : "Unauthrized"});
        }

    } else { // 해당 user_id가 없을 경우
        return res.status(400).json({message : "Unauthrized"});
    }
};

const transfer20 = async (req, res) => {

};


exports.userInfo = userInfo;
exports.join = join;
exports.login = login;
exports.transfer20 = transfer20;
