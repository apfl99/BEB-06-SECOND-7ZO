const db = require("../models");
const NFT = require("../models/nft");
db.NFT = NFT;

const getNftLists = async (req, res) => {
  const nfts = await NFT.findAll({
    attributes: ["token_id", "tx_hash", "token_uri", "price", "isSelling"],
  });
};

const mintNft = (req, res) => {};

const detailNft = (req, res) => {};

const sellNft = (req, res) => {};

const buyNft = (req, res) => {};

module.exports = {
  getNftLists,
  mintNft,
  detailNft,
  sellNft,
  buyNft,
};
