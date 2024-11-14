
/** @format */

import express from "express";
import * as userController from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
