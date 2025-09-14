import express from "express";
import {
    getTenants,
  register,
  tenantSubscription,
} from "../controller/tenantController.js";
import authenticateUser from "../middleware/userMiddleware.js";

const tenantRouter = express.Router();

tenantRouter.post("/register", authenticateUser, register);
tenantRouter.put("/:slug/upgrade", authenticateUser, tenantSubscription);
tenantRouter.get("/list", getTenants);

export default tenantRouter;
