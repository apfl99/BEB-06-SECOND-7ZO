const main = require("./main.route");
const user = require("./user.route");
const topic = require("./topic.route");
const market = require("./market.route");

const router = require("express").Router();

router.use("/", main);

router.use("/user", user);

router.use("/topic", topic);

router.use("/nft_market", market);

module.exports = router;
