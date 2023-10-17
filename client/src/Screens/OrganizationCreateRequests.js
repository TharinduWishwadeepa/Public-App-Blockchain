import React, { useState } from "react";
import Loader from "../Loader/loader";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import axios from "axios";
import jwtDecode from "jwt-decode";

const OrganizationCreateRequests = () => {
  const [NIC, setNIC] = useState("");
  const [variables, setVariables] = useState([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const orgID = decodedToken.id;
  const reqBy = decodedToken.name;

  const nicRegex = /^(?:\d{9}(?:[vVxX]|\d{3}))|(?:\d{12})$/;

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setVariables((prevVariables) => [...prevVariables, value]);
    } else {
      setVariables((prevVariables) =>
        prevVariables.filter((variable) => variable !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(false);
    setError("");

    if (!nicRegex.test(NIC)) {
      setError("Invalid NIC Number!");
      return;
    }
    if (variables.length < 2) {
      setError("You have to Select atLeast one Variable");
      return;
    }
    try {
      setLoader(true);
      const response = await axios.post("http://localhost:8090/createrequest", {
        NIC: NIC,
        requestedby: reqBy,
        orgID: orgID,
        variables: variables,
      });
      if (response.status === 200) {
        alert("New Request Sent!");
        console.log("Request Sent Successfully!");
        setLoader(false);
      } else {
        alert("Request Not Sent!");
        console.log("Request Failed!");
        setLoader(false);
      }
    } catch (error) {
      setError("Something went wrong" + error.message);
      setLoader(false);
    }
  };
  return (
    <div>
      {loader && <Loader />}
      <Navbar />
      {}
      <div className="container mt-5">
        <h2>Create Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nicInput" className="form-label">
              NIC:
            </label>
            <input
              type="text"
              className="form-control"
              id="nicInput"
              value={NIC}
              onChange={(e) => setNIC(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Select Variables:</label>
            <div className="row">
              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="fullname"
                    checked={variables.includes("fullname")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Full Name</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="birthdate"
                    checked={variables.includes("birthdate")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Birth Date</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="gender"
                    checked={variables.includes("gender")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Gender</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="address"
                    checked={variables.includes("address")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Address</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="fathername"
                    checked={variables.includes("fathername")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Father's Name</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="mothername"
                    checked={variables.includes("mothername")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Mother's Name</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="religion"
                    checked={variables.includes("religion")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Religion</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="nationality"
                    checked={variables.includes("nationality")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Nationality</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="passportid"
                    checked={variables.includes("passportid")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Passport ID</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="passportissuedate"
                    checked={variables.includes("passportissuedate")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">
                    Passport Issue Date
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="passportexpirydate"
                    checked={variables.includes("passportexpirydate")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">
                    Passport Expiry Date
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="bloodgroup"
                    checked={variables.includes("bloodgroup")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Blood Group</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="drivinglicenseissuedate"
                    checked={variables.includes("drivinglicenseissuedate")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">
                    Driving Lic Issue Date
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="drivinglicenseexpirydate"
                    checked={variables.includes("drivinglicenseexpirydate")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">
                    Driving Lic Exp Date
                  </label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="typeofvehicles"
                    checked={variables.includes("typeofvehicles")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Type Of Vehicles</label>
                </div>
              </div>

              <div className="col-md-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="birthplace"
                    checked={variables.includes("birthplace")}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label">Birth Place</label>
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Create Request
          </button>
          {error && <p className="text-danger mt-2">{error}</p>}
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default OrganizationCreateRequests;
