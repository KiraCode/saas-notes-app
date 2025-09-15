import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { username, email, password, role, tenant } = req.body;
    const loggedUser = req.user;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "username, email, password are required to register user",
      });
    }

    const isEmailExist = await User.findOne({ email });

    if (isEmailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already present, Please login",
      });
    }

    if (loggedUser.role != "ADMIN") {
      return res.status(400).json({
        success: false,
        message: "Only Admin can invite Member",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "MEMBER",
      tenant: tenant,
    });

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to Register user" });
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required to Login",
      });
    }

    const user = await User.findOne({ email });
    console.log(email);

    if (!user) {
      return res.status(400).json({
        message: `Email and Password are required to login`,
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Inavlid Creadentials",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ success: true, message: "logged in Successfully", accessToken });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
    });
    console.log(error);
  }
};

const getUsers = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  if (user.role != "ADMIN") {
    return res.status(400).json({
      success: false,
      message: "Only Admin can invite Member",
    });
  }

  const loggedUser = await User.findById(id);
  const tenantId = loggedUser.tenant;
  const userList = await User.find({ tenant: tenantId });

  res.status(201).json({
    success: true,
    message: "Fetched Users list",
    userList,
  });
};

const updateUser = async (req, res) => {
  const { username, email, role } = req.body;
  const user = req.user;
  const id = req.params;

  if (!user.id) {
    return res.status(400).json({ message: "user id required" });
  }

  if (user.role != "ADMIN") {
    return res.status(400).json({
      success: false,
      message: "Only Admin can update Member",
    });
  }

  const updateData = {};
  if (role) updateData.role = role;
  if (username) updateData.username = username;
  if (email) updateData.email = email;

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { $set: updateData },
    { returnDocument: "after" }
  );

  res.status(200).json({
    success: true,
    message: "User Updated Successfully",
    task: updatedUser,
  });
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to Logged out" });
  }
};

export { register, login, logout, updateUser, getUsers };
