const mongoose = require("mongoose");

const citizenSchema = mongoose.Schema(
  {
    NIC: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "citizen" },
  },
  { timestamps: true }
);

const citizen = mongoose.model("Citizen", citizenSchema);

module.exports = citizen;
