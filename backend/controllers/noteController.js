const NoteModel = require("../models/noteModel");
const mongoose = require("mongoose");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: "Please fill the title field", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const not = await NoteModel.create({ title, description, user_id });
    res.status(200).json(not);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllNotes = async (req, res) => {
  const user_id = req.user._id;
  const notes = await NoteModel.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
};

const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }
  const note = await NoteModel.findById(id);
  if (!note) {
    return res.status(404).json({ error: "Note didnt find" });
  }
  res.status(200).json(note);
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }
  const note = await NoteModel.findOneAndDelete(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!note) {
    return res.status(404).json({ error: "Note could not find" });
  }
  res.status(200).json(note);
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID is not valid" });
  }
  const note = await NoteModel.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );
  if (!note) {
    return res.status(404).json({ error: "Note could not find" });
  }
  res.status(200).json(note);
};

module.exports = { createNote, getAllNotes, getNote, deleteNote, updateNote };
