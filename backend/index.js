import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/config/db.js";
import userRouter from "./src/routes/userRoutes.js";
import tenantRouter from "./src/routes/tenantRoutes.js";
import notesRouter from "./src/routes/notesRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db();

app.use("/users", userRouter);
app.use("/tenants", tenantRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}...💻`);
});
