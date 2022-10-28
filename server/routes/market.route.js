const express = require("express");

const marketControllers = require("../controllers/market.controllers");

const router = express.Router();

router.get("/", marketControllers.getNftLists);

router.post("/mint", marketControllers.mintNft);

router.get("/:tid", marketControllers.detailNft);

router.post("/:tid/sell", marketControllers.sellNft);

router.post("/:tid/buy", marketControllers.buyNft);

module.exports = router;
