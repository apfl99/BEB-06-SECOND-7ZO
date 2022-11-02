const Sequelize = require("sequelize");
const NFT = require("./nft");
const Post = require("./post");
const User = require("./user");

const env = "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

// db 객체에 User, Post, NFT 모델을 담음 -> 앞으로 db를 require해서 접근 가능
db.User = User;
db.Post = Post;
db.NFT = NFT;

// 각 모델의 static init을 호출, init이 실행되어야 테이블이 모델로 연결(테이블-모델 연결)
User.init(sequelize);
Post.init(sequelize);
NFT.init(sequelize);

// 다른 테이블과 관계를 연결
User.associate(db);
Post.associate(db);
NFT.associate(db);

module.exports = db;
