<<<<<<< HEAD
const { sequelize } = require("../models");
const db = require("../models");
const NFT = require("../models/nft");
db.NFT = NFT;
NFT.init(sequelize);

const getNftLists = async (req, res) => {
  let nftArr = [];
  const nfts = await NFT.findAll({
    attributes: ["token_id", "tx_hash", "token_uri", "price", "isSelling"],
  });
  nfts.forEach((element) => {
    nftArr.push(element.dataValues);
  });
=======
const db = require("../models");
const NFT = require("../models/nft");
db.NFT = NFT;

const getNftLists = async (req, res) => {
  const nfts = await NFT.findAll({
    attributes: ["token_id", "tx_hash", "token_uri", "price", "isSelling"],
  });
>>>>>>> c197964 (stash)
};

const mintNft = (req, res) => {};

const detailNft = async (req, res) => {
  let id = req.body.nid;
  const nft = await NFT.findOne({
    where: { id },
  });
  res.status(200).send(nft);
};

const sellNft = (req, res) => {};

const buyNft = (req, res) => {};

module.exports = {
  getNftLists,
  mintNft,
  detailNft,
  sellNft,
  buyNft,
};
