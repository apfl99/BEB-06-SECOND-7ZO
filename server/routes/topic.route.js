const topicsControllers = require("../controllers/topics.controllers");
const checkAuth = require("../middleware/check-auth");
const { check } = require("express-validator");

const router = require("express").Router();

router.get("/:pid", topicsControllers.getTopic);

// 들어오는 요청에 유효한 토큰이 있는지 확인하는 미들웨어
router.use(checkAuth);

router.post(
  "/new_topic",
  [
    check("title").not().isEmpty().isLength({ max: 50 }),
    check("content").isLength({ min: 5 }),
  ],
  topicsControllers.newTopic
);

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
