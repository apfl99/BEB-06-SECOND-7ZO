const { sequelize } = require("../models");
const db = require("../models");
const Post = require("../models/post");

db.Post = Post;
Post.init(sequelize);

const getTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.findOne({ where: { id } });
  if (topic === null) {
    return res.status(404).json({ data: null });
  }
  return res.status(200).send(topic);
};

const updateTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.update(req.body, { where: { id } });
  return res.status(200).send(topic);
};

const deleteTopic = async (req, res) => {
  let id = req.params.pid;
  const topic = await Post.destroy({ where: { id } });
  console.log(topic);
  return res.status(200).send("찾을 수 없는 게시물입니다");
};

module.exports = {
  getTopic,
  updateTopic,
  deleteTopic,
};

/*

  let hashedPassword;
  bcrypt.hash(password, 12) : 해싱할 비밀번호를 전달하여 수신요청에서 추출, 솔트 값
  bcrypt.compare(password, password) : 해싱값 비교(해당 평문을 해쉬하면 위에서 언급한 hash값과 같은지), 비교할 평문값

*/
