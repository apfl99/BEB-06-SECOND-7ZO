const express = require("express");

const mainControllers = require("../controllers/main.controllers");

const router = express.Router();

router.get("/", mainControllers.main);

router.post("/new_topic", mainControllers.newTopic);

router.get("/faucet/:address", mainControllers.faucet);

module.exports = router;
