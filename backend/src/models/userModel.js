import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["ADMIN", "MEMBER"],
      default: "MEMBER",
    },
    plan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE",
    },
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tenant",
      required: true,
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
