import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from './src/config/db.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db();

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}...💻`);
});
