const express = require("express");

const usersController = require("../controllers/users.controllers");

const router = express.Router();

router.get("/:uid", usersController.userInfo);

router.post("/login", usersController.login);

router.post("/join", usersController.join);

router.post("/transfer_20", usersController.transfer20);

module.exports = router;
