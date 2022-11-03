const mainControllers = require("../controllers/main.controllers");
const checkAuth = require("../middleware/check-auth");

const { check } = require("express-validator");
const { route } = require("./topic.route");

const router = require("express").Router();

router.get("/", mainControllers.main);

router.get("/faucet/:address", mainControllers.faucet);

router.use(checkAuth);

router.post(
  "/new_topic",
  [
    check("title").not().isEmpty().isLength({ max: 50 }),
    check("content").isLength({ min: 5 }),
  ],
  mainControllers.newTopic
);

module.exports = router;
