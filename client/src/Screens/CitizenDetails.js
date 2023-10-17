import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Loader from "../Loader/loader";

const CitizenDetails = ({ token }) => {
  const decodedToken = jwtDecode(token);
  const nicNumber = decodedToken.NIC;

  const [result, setResult] = useState({});
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `http://localhost:8090/viewcitizen/${nicNumber}`
        );
        if (response.status === 200) {
          setResult(response.data);
          setLoader(false);
        } else {
          setError(
            `It Seems Like Your (${nicNumber}) Details are Not Available in Our Blockchain!`
          );
          setLoader(false);
        }
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          setError(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          // The request was made but no response was received
          setError("Error: No response received from the server.");
        } else {
          // Something else happened while setting up the request
          setError(`Error: ${error.message}`);
        }
        setLoader(false);
      }
    };
    fetchData();
  }, [nicNumber]);

  return (
    <Container>
      {loader ? (
        <Loader />
      ) : (
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Citizen Details</h2>
            {error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div>
                <p>
                  <strong>NIC: </strong>
                  {result.NIC}
                </p>
                <p>
                  <strong>Full Name: </strong>
                  {result.fullname}
                </p>
                <p>
                  <strong>Birthdate: </strong>
                  {result.birthdate}
                </p>
                <p>
                  <strong>Gender: </strong>
                  {result.gender}
                </p>
                <p>
                  <strong>Address: </strong>
                  {result.address}
                </p>
                <p>
                  <strong>Birth Place: </strong>
                  {result.birthplace}
                </p>
                <p>
                  <strong>Father's Name: </strong>
                  {result.fathername}
                </p>
                <p>
                  <strong>Mother's Name: </strong>
                  {result.mothername}
                </p>
                <p>
                  <strong>Religion: </strong>
                  {result.religion}
                </p>
                <p>
                  <strong>Nationality: </strong>
                  {result.nationality}
                </p>
                <p>
                  <strong>Passport ID: </strong>
                  {result.passportid}
                </p>
                <p>
                  <strong>Passport Issue Date: </strong>
                  {result.passportissuedate}
                </p>
                <p>
                  <strong>Passport Expire Date: </strong>
                  {result.passportexpirydate}
                </p>
                <p>
                  <strong>Blood Group: </strong>
                  {result.bloodgroup}
                </p>
                <p>
                  <strong>Driving License Issue Date: </strong>
                  {result.drivinglicenseissuedate}
                </p>
                <p>
                  <strong>Driving License Expire Date: </strong>
                  {result.drivinglicenseexpirydate}
                </p>
                <p>
                  <strong>Type of Vehicles: </strong>
                  {result.typeofvehicles}
                </p>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CitizenDetails;
