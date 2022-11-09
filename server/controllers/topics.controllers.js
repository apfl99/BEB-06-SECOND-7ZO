const { sequelize, User } = require("../models");

const db = require("../models");
const Post = require("../models/post");

const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545")); // 가나슈와 연동(로컬)
db.Post = Post;
Post.init(sequelize);

const fs = require("fs");
var DEPLOYED_ABI = JSON.parse(
  fs.readFileSync("../contract/20deployedABI", "utf8")
);
var DEPLOYED_ADDRESS = fs
  .readFileSync("../contract/20deployedAddress", "utf8")
  .replace(/\n|\r/g, "");
const Contract20 = new web3.eth.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

const getTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.findOne({ where: { id } });
  if (topic === null) {
    return res.status(404).json({ data: null });
  }
  return res.status(200).send(topic);
};

// 글 작성
const newTopic = async (req, res) => {
  console.log(req.body)
  const { title, content, img_url } = req.body;
  let info = {
    title: title,
    content: content,
    img_url: img_url,
    user_id: req.userId,
  };
  const topic = await Post.create(info);

  const user = await User.findOne({
    where: {
      id: info.user_id,
    },
  });
  console.log(user)
  if (user == null) {
    return res.status(404).json({ data: null });
  }

  const serverAccounts = await web3.eth.getAccounts();
  const userAccount = user.dataValues.address;

  await Contract20.methods
    .transfer(userAccount, 10)
    .send({ from: serverAccounts[0] })
    .then((data) => console.log(data));

  const UserTokenBalance = await Contract20.methods
    .balanceOf(userAccount)
    .call();
  const ServerTokenBalance = await Contract20.methods
    .balanceOf(serverAccounts[0])
    .call();

  await user.update({ token_amount: UserTokenBalance });

  res.status(200).send(topic);
};

const updateTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.findOne({ where: { id } });

  if (topic.user_id === req.userId) {
    const { title, content, img_url } = req.body;
    let info = {
      title: title,
      content: content,
      img_url: img_url,
    };
    await Post.update(info, { where: { id } });
    const topic = await Post.findOne({ where: { id } });
    return await res.status(200).send(topic);
  } else {
    return res.status(403).send({ message: "해당 게시물의 소유주가 아닙니다" });
  }
};

const deleteTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.findOne({ where: { id } });
  if (topic.user_id === req.userId) {
    await Post.destroy({ where: { id } });
    return res.status(200).send({ message: "삭제되었습니다" });
  } else {
    return res.status(403).send({ message: "해당 게시물의 소유주가 아닙니다" });
  }
};

module.exports = {
  getTopic,
  updateTopic,
  deleteTopic,
  newTopic,
};

/*

  let hashedPassword;
  bcrypt.hash(password, 12) : 해싱할 비밀번호를 전달하여 수신요청에서 추출, 솔트 값
  bcrypt.compare(password, password) : 해싱값 비교(해당 평문을 해쉬하면 위에서 언급한 hash값과 같은지), 비교할 평문값

*/
