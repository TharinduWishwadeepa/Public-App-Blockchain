"use strict";
const express = require("express");
const cors = require("cors");
const citizenRoute = require("./routes/citizenRoutes");
const organizationRoute = require("./routes/organizationRoutes");
const governmentRoutes = require("./routes/governmentRoutes");
//const dotenv = require('dotenv');
const path = require("path");
const fs = require("fs");
const app = express();
//parse URL encoded bodies (sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use("/auth/citizen", citizenRoute);
app.use("/auth/organization", organizationRoute);
app.use("/auth/government", governmentRoutes);
const { v4: uuidv4 } = require("uuid");

const org1UserId = "publicUser";
const channelName = "mychannel";
const chaincodeName = "blockchainid";

// Setting for Hyperledger Fabric
const { Gateway, Wallets } = require("fabric-network");

function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

//database connection
const mongoose = require("mongoose");
const url =
  "mongodb+srv://user:7v0KZSKcqPPjvbqk@cluster0.w6k02d6.mongodb.net/?retryWrites=true&w=majority";
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });
// end DB connection

///// ---------- -----need to check with logged user ------------------

//create request - use by non-gov organizations
app.post("/createrequest", async function (req, res) {
  const { NIC, variables, requestedby, orgID } = req.body;
  console.log(variables);
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: CreateReq");
      let reqid = uuidv4();
      let result = await contract.submitTransaction(
        "makeRequest",
        NIC,
        variables,
        requestedby,
        reqid,
        orgID
      );
      console.log("*** Result: committed create req");
      res.send("200");
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//view pending requests of citizen - use by citizen
app.get("/viewpendingrequestsofcitizen/:NIC", async function (req, res) {
  const { NIC } = req.params;
  console.log(NIC);
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: viewpendingrequests");
      let result = await contract.evaluateTransaction(
        "viewPendingRequestsofCitizen",
        NIC
      );
      res.send(result).status(200);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result)}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//view accepted requests of citizen - use by citizen
app.get("/viewacceptedrequestsofcitizen/:NIC", async function (req, res) {
  const { NIC } = req.params;
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: viewAcceptedRequestsofCitizen");
      let result = await contract.evaluateTransaction(
        "viewAcceptedRequestsofCitizen",
        NIC
      );

      res.send(result).status(200);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result)}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//accept request - use by citizen
app.post("/acceptrequest/:reqid", async function (req, res) {
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: AcceptReq");

      let result = await contract.submitTransaction(
        "acceptRequest",
        req.params.reqid
      );
      console.log("*** Result: committed AcceptReq");
      res.send("200");
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//view citizen info from request - use by non-gov organizations
app.get("/viewcitizenfromrequest/:reqid", async function (req, res) {
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: view citizen from req");
      let result = await contract.evaluateTransaction(
        "viewCitizenInfo",
        req.params.reqid
      );
      console.log("*** Result: ");
      res.send("200");
      console.log(prettyJSONString(result));
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result)}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//view single request
app.get("/viewrequest/:reqid", async function (req, res) {
  //const {reqid} = req.params.reqid;
  console.log(req.params.reqid);
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: check req");
      let result = await contract.evaluateTransaction(
        "ReadRequest",
        req.params.reqid
      );
      console.log("*** Result: check req");
      const typ = result;
      console.log(typ);
      res.send(typ);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

/////
//view pending requests of organization - use by organization
app.get("/viewpendingrequestsoforg/:orgID", async function (req, res) {
  const { orgID } = req.params;
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: viewpendingrequests");
      let result = await contract.evaluateTransaction(
        "viewPendingRequestsofOrg",
        orgID
      );
      res.send(result).status(200);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result)}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//view accepted requests of organization - use by organization
app.get("/viewacceptedrequestsoforg/:orgID", async function (req, res) {
  const { orgID } = req.params;
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions
    try {
      console.log("\n--> Submit Transaction: viewAcceptedRequestsofOrg");
      let result = await contract.evaluateTransaction(
        "viewAcceptedRequestsofOrg",
        orgID
      );

      res.send(result).status(200);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result)}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

//////

//view citizen all information in world state - latest update - must be used by gov org and foreign immigration
app.get("/viewcitizen/:NIC", async function (req, res) {
  try {
    //------------------- start of contract setup -------------------
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));
    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), "../wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get(org1UserId);
    if (!identity) {
      console.log(
        'An identity for the user "publicUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }
    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channelName);

    // Get the contract{ chaincode name} from the network.
    const contract = network.getContract(chaincodeName);

    //------------------- End of contract setup -------------------

    //chaincode functions

    try {
      console.log("\n--> Submit Transaction: view citizen in world state");
      let result = await contract.evaluateTransaction(
        "ReadCitizen",
        req.params.NIC
      );
      console.log("*** Result: view citizen in world state");
      res.send(result).status(200);
      if (`${result}` !== "") {
        console.log(`*** Result: ${prettyJSONString(result.toString())}`);
      }
    } catch (error) {
      console.log(`*** Error: \n    ${error}`);
      res.status(500);
    }

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.log("catched error: " + error);
  }
});

app.listen(8090, () => {
  console.log("Server is listening");
});
