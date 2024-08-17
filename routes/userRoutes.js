const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

userRouter.post("/signup", registerUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;