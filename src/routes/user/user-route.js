const express = require("express");
const userController = require("../../controllers/user/user-controller");

const router = express.Router();

router.get("/:id", userController.getDetailUser);

module.exports = router;
