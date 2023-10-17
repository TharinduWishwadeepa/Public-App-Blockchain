const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Citizen = require("../schemas/citizenSchema");

//citizen registration
router.post("/register", async (req, res) => {
  try {
    // Check if the correct JSON key name is used
    if (!req.body.registerPassword) {
      // Send an error response and terminate the request flow
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    if (!req.body.registerNIC) {
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    var NICExist = await Citizen.findOne({ NIC: req.body.registerNIC });
    if (NICExist) {
      return res.status(400).send("NIC Already registered!");
    }
    var hash = await bcrypt.hash(req.body.registerPassword, 10);
    const citizen = new Citizen({ NIC: req.body.registerNIC, password: hash });
    await citizen
      .save()
      .then(() => {
        console.log("New Citizen Added!");
      })
      .catch(() => {
        console.log("Error Adding New Citizen to Database!");
      });
    res.send(citizen);
  } catch (error) {
    res.status(405).send("Something Went Wrong! " + error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    //check if the correct Json key is used
    if (!req.body.LoginPassword) {
      // Send an error response and terminate the request flow
      return res.status(400).json({ error: "Invalid JSON key name" });
    }

    if (!req.body.LoginNic) {
      return res.status(401).json({ error: "Invalid JSON key name" });
    }
    const existCitizen = await Citizen.findOne({ NIC: req.body.LoginNic });
    if (!existCitizen) {
      return res.status(400).json({ error: "NIC Number Not Exist!" });
    }
    var validPassword = await bcrypt.compare(
      req.body.LoginPassword,
      existCitizen.password
    );
    if (!validPassword) {
      return res.status(400).json({ error: "Password Missmatched!" });
    }

    var userToken = jwt.sign(
      { NIC: existCitizen.NIC, role: existCitizen.role },
      "(q6B,;fpCP{ff/74bXA7^xC4Dk~p",
      {
        expiresIn: "1h",
      }
    );
    res.header("token", userToken).send(userToken);
  } catch (error) {
    res.status(405).send("Something Went Wrong! " + error.message);
  }
});

module.exports = router;
