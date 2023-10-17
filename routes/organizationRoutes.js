const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../schemas/organizationSchema");

//Organization registration
router.post("/register", async (req, res) => {
  try {
    // Check if the correct JSON key name is used
    if (!req.body.password) {
      // Send an error response and terminate the request flow
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    if (!req.body.email) {
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    if (!req.body.name) {
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    var emailExist = await Organization.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).send("Email Already registered!");
    }
    var hash = await bcrypt.hash(req.body.password, 10);
    const organization = new Organization({
      email: req.body.email,
      name: req.body.name,
      password: hash,
    });
    await organization
      .save()
      .then(() => {
        console.log("New Organization Added!");
      })
      .catch(() => {
        console.log("Error Adding New Organization to Database!");
      });
    res.send(organization);
  } catch (error) {
    res.status(405).send("Something Went Wrong! " + error.message);
  }
});

//Organization login
router.post("/login", async (req, res) => {
  try {
    //check if the correct Json key is used
    if (!req.body.password) {
      // Send an error response and terminate the request flow
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    if (!req.body.email) {
      return res.status(400).json({ error: "Invalid JSON key name" });
    }
    const existOrganization = await Organization.findOne({
      email: req.body.email,
    });
    if (!existOrganization) {
      return res.status(400).json({ error: "Email Address Not Exist!" });
    }
    var validPassword = await bcrypt.compare(
      req.body.password,
      existOrganization.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Password Missmatched!" });
    }

    var orgToken = jwt.sign(
      {
        email: existOrganization.email,
        name: existOrganization.name,
        role: existOrganization.role,
        createdAt: existOrganization.createdAt,
        id: existOrganization._id,
      },
      "(q6B,;fpCP{ff/74bXA7^xC4Dk~p",
      {
        expiresIn: "1h",
      }
    );
    res.header("token", orgToken).send(orgToken);
  } catch (error) {
    res.status(405).send("Something Went Wrong! " + error.message);
  }
});

module.exports = router;
