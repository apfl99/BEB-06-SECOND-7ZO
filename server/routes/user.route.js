const usersController = require("../controllers/users.controllers.js");

const router = require("express").Router();

router.get("/:uid", usersController.userInfo);

router.post("/login", usersController.login);

router.post("/join", usersController.join);

router.post("/:uid/transfer_20", usersController.transfer20);

module.exports = router;
