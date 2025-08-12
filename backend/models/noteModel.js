const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Note title is required"],
    },
    description: {
      type: String,
    },
    user_id: {
      type: String,
      required: [true, "User id is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Not", notSchema);
