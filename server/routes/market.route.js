const express = require("express");

const marketControllers = require("../controllers/market.controllers");

const router = express.Router();

router.get("/", marketControllers.getNftLists);

router.post("/mint", marketControllers.mintNft);

router.get("/:nid", marketControllers.detailNft);

router.post("/:nid/sell", marketControllers.sellNft);

router.post("/:nid/buy", marketControllers.buyNft);

module.exports = router;
