const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "org" },
  },
  { timestamps: true }
);

const organization = mongoose.model("Organization", organizationSchema);

module.exports = organization;
