const topicsControllers = require("../controllers/topics.controllers");

const router = require("express").Router();

router.get("/:pid", topicsControllers.getTopic);

router.patch("/:pid", topicsControllers.updateTopic);

router.delete("/:pid", topicsControllers.deleteTopic);

module.exports = router;
