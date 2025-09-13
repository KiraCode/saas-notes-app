import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    clients: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ["FREE", "PRO"],
      default: "FREE",
    },
  },
  { timestamps: true }
);

const Tenant = new mongoose.model("Tenant", tenantSchema);
export default Tenant;
