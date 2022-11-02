
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
