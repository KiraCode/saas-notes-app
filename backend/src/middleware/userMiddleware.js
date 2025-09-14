import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(404)
      .json({ success: false, message: "Np token found, Please Login" });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    try {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res
          .status(403)
          .json({ success: false, message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      console.error("Error authenticating user", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

export default authenticateUser;
