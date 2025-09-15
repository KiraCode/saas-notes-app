import express from "express";
import {
  getUsers,
  login,
  logout,
  register,
  updateUser,
} from "../controller/userController.js";
import authenticateUser from "../middleware/userMiddleware.js";

const userRouter = express.Router();

userRouter.get("/list/:id",authenticateUser, getUsers);
userRouter.post("/register", authenticateUser, register);
userRouter.post("/login", login);
userRouter.put("/update/:id", authenticateUser, updateUser);
userRouter.post("/logout", logout);

export default userRouter;
