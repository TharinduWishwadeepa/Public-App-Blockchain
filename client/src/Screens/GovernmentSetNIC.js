import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/loader";
import { Container, Form, Button } from "react-bootstrap";
import GovSetNIC from "./css/GovernmentSetNIC.module.css";

const GovernmentSetNIC = () => {
  const navigate = useNavigate();
  const nicRegex = /^(?:\d{9}(?:[vVxX]|\d{3}))|(?:\d{12})$/;

  const [nic, setNic] = useState("");
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event) => {
    setNic(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!nicRegex.test(nic)) {
      setError("Invalid NIC Number!");
      return;
    }

    try {
      setLoader(true);
      const response = await axios.get(
        `http://localhost:8090/viewcitizen/${nic}`
      );

      if (response.status === 200) {
        navigate("/showdetails", {
          state: { NIC: nic, data: response.data },
        });
        setLoader(false);
      } else {
        setError("Error Fetching User Data!");
        setLoader(false);
      }
      setLoader(false);
    } catch (error) {
      setError("Something Went Wrong! " + error.message);
      setLoader(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-90">
      {loader && <Loader />}
      <Container className={GovSetNIC.container}>
        <div className={GovSetNIC.getnic}>
          <h1>Find Citizen Step 1</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nic">
              <Form.Label>NIC:</Form.Label>
              <Form.Control
                type="text"
                value={nic}
                onChange={handleInputChange}
                placeholder="Enter NIC"
                required
              />
            </Form.Group>
            {error && <p className="error-message mt-2">{error}</p>}
            <Button
              variant="primary"
              type="submit"
              style={{ width: "200px" }}
              className="mt-3"
            >
              Find Citizen
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default GovernmentSetNIC;
