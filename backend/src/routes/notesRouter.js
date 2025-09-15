import express from "express";
import authenticateUser from "../middleware/userMiddleware.js";
import { createNote, deleteNote, getNotes, updateNote } from "../controller/notesController.js";

const notesRouter = express.Router();

notesRouter.post("/add", authenticateUser, createNote);
notesRouter.get("/list/:id", authenticateUser, getNotes);
notesRouter.put("/update/:id", authenticateUser, updateNote);
notesRouter.delete("/delete/:id", deleteNote);

export default notesRouter;
