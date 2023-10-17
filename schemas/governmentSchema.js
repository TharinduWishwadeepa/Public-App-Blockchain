const mongoose = require("mongoose");

const governmentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const government = mongoose.model("Government", governmentSchema);

module.exports = government;