import Tenant from "../models/tenantModel.js";

const register = async (req, res) => {
  try {
    const { name } = req.body;
    const loggedUser = req.user;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "please enter the tenant name",
      });
    }

    if (loggedUser.role != "ADMIN") {
      return res.status(400).json({
        success: false,
        message: "Only Admin can Create tenant",
      });
    }

    const isTenantNameExist = await Tenant.findOne({ name });

    if (isTenantNameExist) {
      return res.status(400).json({
        success: false,
        message: "Tenant already present, Please enter different name",
      });
    }

    const user = await Tenant.create({
      name,
    });

    res.status(201).json({
      success: true,
      message: "Tenant created Successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create Tenant" });
    console.log(error);
  }
};

export { register };
