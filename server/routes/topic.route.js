const topicsControllers = require("../controllers/topics.controllers");
const { check } = require("express-validator");

const router = require("express").Router();

router.get("/:pid", topicsControllers.getTopic);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty().isLength({ max: 50 }),
    check("content").isLength({ min: 5 }),
  ],
  topicsControllers.updateTopic
);

router.delete("/:pid", topicsControllers.deleteTopic);

module.exports = router;
