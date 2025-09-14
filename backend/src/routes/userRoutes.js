import express from "express";
import {
  login,
  logout,
  register,
} from "../controller/userController.js";
import authenticateUser from "../middleware/userMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", authenticateUser, register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);

export default userRouter;
