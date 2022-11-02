const { sequelize } = require("../models");
const db = require("../models");
const NFT = require("../models/nft");
db.NFT = NFT;

const getNftLists = async (req, res) => {
  let nftArr = [];
  const nfts = await NFT.findAll({
    attributes: ["token_id", "tx_hash", "token_uri", "price", "isSelling"],
  });
  nfts.forEach((element) => {
    nftArr.push(element.dataValues);
  });
  return res.status(200).send(nftArr);
};

const mintNft = (req, res) => {};

const detailNft = async (req, res) => {
  let id = req.params.nid;
  const nft = await NFT.findOne({
    where: { id },
  });
  if (id === null) {
    return res.status(404).json({ data: null });
  }
  return res.status(200).send(nft);
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
