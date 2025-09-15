import Tenant from "../models/tenantModel.js";

const register = async (req, res) => {
  try {
    const { name, slug, plan } = req.body;
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
      slug,
      plan,
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

const tenantSubscription = async (req, res) => {
  try {
    const { slug } = req.params;
    const { plan } = req.body;
    const user = req.user;

    if (!user.id) {
      return res.status(400).json({ message: "user id is required" });
    }
    console.log(user.role);
    if (user.role != "ADMIN") {
      return res.status(400).json({
        success: false,
        message: "Only Admin can Update Subscription",
      });
    }

    const updatePlan = await Tenant.findOneAndUpdate(
      { slug: slug },
      {
        plan: plan,
      },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Tenant SUbscription Updated Successfully",
      tenant: updatePlan,
    });
  } catch (error) {
    console.error("failed to update the tenant", error);

    res.status(400).json({
      success: false,
      message: "failed to update the Subscription",
    });
  }
};

const getTenants = async (req, res) => {
  try {
    const tenants = await Tenant.find({});
    res.status(200).json({
      success: true,
      message: "Tenant fetched Successfully",
      tenants: tenants,
    });
  } catch (error) {
    console.error("failed to fetch tenants", error);

    res.status(400).json({
      success: false,
      message: "failed to fetch tenants",
    });
  }
};

export { register, tenantSubscription, getTenants };
