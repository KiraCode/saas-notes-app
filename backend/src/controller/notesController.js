import Notes from "../models/notesModel.js";
import Tenant from "../models/tenantModel.js";
import User from "../models/userModel.js";

const createNote = async (req, res) => {
  try {
    const { title, content, createdBy } = req.body;
    const user = req.user;

    if (!title) {
      return res.status(400).json({ message: "Title not found" });
    }

    if (user.role != "MEMBER") {
      return res.status(400).json({
        success: false,
        message: "Only MEMBER can create notes",
      });
    }

    const tenantDetails = await User.findById(user.id).populate("tenant");
    const plan = tenantDetails.tenant.plan;

    const notesList = await Notes.find({ createdBy: user.id });

    if (user.role === "MEMBER" && plan === "FREE" && notesList.length >= 3) {
      return res.status(403).json({
        success: false,
        message: "Note limit reached. Upgrade to PRO for unlimited notes.",
      });
    }

    const newNote = await Notes.create({ title, content, createdBy: user.id });

    res.status(201).json({
      success: true,
      message: "Notes Created Successfully",
      notes: newNote,
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "failed to Create Note",
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const userId = req.params;
    const notes = await Notes.find({ createdBy: userId });

    res.status(200).json({
      success: true,
      notes,
      message: "Fetched all the Notes Successfully",
    });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({
      success: false,
      message: "failed to fetch Notes",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const user = req.user;
    if (!id) {
      return res.status(400).json({ message: "Note is required" });
    }
    if (user.role != "MEMBER") {
      return res.status(400).json({
        success: false,
        message: "Only MEMBER can update notes",
      });
    }
    const updatedNote = await Notes.findByIdAndUpdate(
      { _id: id, createdBy: user.id },
      { title, content },
      { returnDocument: "after" }
    );

    res.status(200).json({
      success: true,
      message: "Note Updated Successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error("failed to update the task", error);

    res.status(400).json({
      success: false,
      message: "failed to update the task",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Note id is required" });
    }
    if (user.role != "MEMBER") {
      return res.status(400).json({
        success: false,
        message: "Only MEMBER can delete notes",
      });
    }
    const deletedNote = await Notes.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Note deleted Successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.error("Error in deleting task", error);

    res.status(400).json({
      success: false,
      message: "Task deleted unsuccessfully",
    });
  }
};
export { createNote, getNotes, updateNote, deleteNote };
