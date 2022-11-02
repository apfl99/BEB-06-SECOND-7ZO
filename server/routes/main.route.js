const mainControllers = require("../controllers/main.controllers");
const { check } = require("express-validator");

const router = require("express").Router();

router.get("/", mainControllers.main);

router.post(
  "/new_topic",
  [
    check("title").not().isEmpty().isLength({ max: 50 }),
    check("content").isLength({ min: 5 }),
  ],
  mainControllers.newTopic
);

router.get("/faucet/:address", mainControllers.faucet);

module.exports = router;
