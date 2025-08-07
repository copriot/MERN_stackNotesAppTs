const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Not", notSchema);
