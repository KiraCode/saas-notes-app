import express from "express";
import { register } from "../controller/tenantController.js";

const tenantRouter = express.Router();

tenantRouter.post("/register", register);

export default tenantRouter;
