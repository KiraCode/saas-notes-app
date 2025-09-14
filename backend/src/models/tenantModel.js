import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Tenant = new mongoose.model("Tenant", tenantSchema);
export default Tenant;
