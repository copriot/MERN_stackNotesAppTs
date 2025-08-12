const express = require("express");
const {
  createNote,
  getAllNotes,
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const authControl = require("../middlewares/authControl");
const router = express.Router();

router.use(authControl);

//Tüm notları getir

router.get("/", getAllNotes);
//idsine göre not getir
router.get("/:id", getNote);

//not ekle
router.post("/", createNote);

//not sil
router.delete("/:id", deleteNote);
//not güncelle
router.patch("/:id", updateNote);

module.exports = router;
