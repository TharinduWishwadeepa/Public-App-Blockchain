const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Government = require("../schemas/governmentSchema");

//user login code
router.post("/login", async (req, res) => {
  try {
    var govData = await Government.findOne({ email: req.body.email });
    if (!govData) {
      return res.status(400).json("Email Not Exist");
    }
    var validPassword = await bcrypt.compare(
      req.body.password,
      govData.password
    );
    if (!validPassword) {
      return res.status(400).json("Password missmatached");
    }

    var govToken = jwt.sign(
      {
        name: govData.name,
        email: govData.email,
        role: govData.role,
        id: govData._id,
      },
      "(q6B,;fpCP{ff/74bXA7^xC4Dk~p",
      {
        expiresIn: "1h",
      }
    );
    res.setHeader("auth", govToken);
    res.header("auth", govToken).send(govToken);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
