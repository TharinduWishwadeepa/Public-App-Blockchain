import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Loader from "../Loader/loader";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const GovernmentShowDetails = () => {
  const location = useLocation();
  const { NIC, data } = location.state;
  const [error, setError] = useState("");
  const [result, setResult] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (data === "" || !data) {
      setError("Error Fetching Data!");
      setLoader(false);
    } else {
      setError("");
      setResult(data);
      setLoader(false);
    }
  }, [data]);

  return (
    // <Container>
    //   {loader ? (
    //     <Loader />
    //   ) : (
    //     <Row className="justify-content-center">
    //       <Col md={6}>
    //         <h2>Details of {NIC}</h2>
    //         {error ? (
    //           <p style={{ color: "red" }}>{error}</p>
    //         ) : (
    //           <div>
    //             <p>
    //               <strong>NIC: </strong>
    //               {result.NIC}
    //             </p>
    //             <p>
    //               <strong>Full Name: </strong>
    //               {result.fullname}
    //             </p>
    //             <p>
    //               <strong>Birthdate: </strong>
    //               {result.birthdate}
    //             </p>
    //             <p>
    //               <strong>Gender: </strong>
    //               {result.gender}
    //             </p>
    //             <p>
    //               <strong>Address: </strong>
    //               {result.address}
    //             </p>
    //             <p>
    //               <strong>Birth Place: </strong>
    //               {result.birthplace}
    //             </p>
    //             <p>
    //               <strong>Father's Name: </strong>
    //               {result.fathername}
    //             </p>
    //             <p>
    //               <strong>Mother's Name: </strong>
    //               {result.mothername}
    //             </p>
    //             <p>
    //               <strong>Religion: </strong>
    //               {result.religion}
    //             </p>
    //             <p>
    //               <strong>Nationality: </strong>
    //               {result.nationality}
    //             </p>
    //             <p>
    //               <strong>Passport ID: </strong>
    //               {result.passportid}
    //             </p>
    //             <p>
    //               <strong>Passport Issue Date: </strong>
    //               {result.passportissuedate}
    //             </p>
    //             <p>
    //               <strong>Passport Expire Date: </strong>
    //               {result.passportexpirydate}
    //             </p>
    //             <p>
    //               <strong>Blood Group: </strong>
    //               {result.bloodgroup}
    //             </p>
    //             <p>
    //               <strong>Driving License Issue Date: </strong>
    //               {result.drivinglicenseissuedate}
    //             </p>
    //             <p>
    //               <strong>Driving License Expire Date: </strong>
    //               {result.drivinglicenseexpirydate}
    //             </p>
    //             <p>
    //               <strong>Type of Vehicles: </strong>
    //               {result.typeofvehicles}
    //             </p>
    //           </div>
    //         )}
    //       </Col>
    //     </Row>
    //   )}
    // </Container>
    <div>
      <Navbar />
      <Container>
        {loader ? (
          <Loader />
        ) : (
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h2>Details of {NIC}</h2>
                </Card.Header>
                <Card.Body>
                  {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                  ) : (
                    <div>
                      <Card.Text>
                        <strong>NIC: </strong>
                        {result.NIC}
                      </Card.Text>
                      <Card.Text>
                        <strong>Full Name: </strong>
                        {result.fullname}
                      </Card.Text>
                      <Card.Text>
                        <strong>Birthdate: </strong>
                        {result.birthdate}
                      </Card.Text>
                      <Card.Text>
                        <strong>Gender: </strong>
                        {result.gender}
                      </Card.Text>
                      <Card.Text>
                        <strong>Address: </strong>
                        {result.address}
                      </Card.Text>
                      <Card.Text>
                        <strong>Birth Place: </strong>
                        {result.birthplace}
                      </Card.Text>
                      <Card.Text>
                        <strong>Father's Name: </strong>
                        {result.fathername}
                      </Card.Text>
                      <Card.Text>
                        <strong>Mother's Name: </strong>
                        {result.mothername}
                      </Card.Text>
                      <Card.Text>
                        <strong>Religion: </strong>
                        {result.religion}
                      </Card.Text>
                      <Card.Text>
                        <strong>Nationality: </strong>
                        {result.nationality}
                      </Card.Text>
                      <Card.Text>
                        <strong>Passport ID: </strong>
                        {result.passportid}
                      </Card.Text>
                      <Card.Text>
                        <strong>Passport Issue Date: </strong>
                        {result.passportissuedate}
                      </Card.Text>
                      <Card.Text>
                        <strong>Passport Expire Date: </strong>
                        {result.passportexpirydate}
                      </Card.Text>
                      <Card.Text>
                        <strong>Blood Group: </strong>
                        {result.bloodgroup}
                      </Card.Text>
                      <Card.Text>
                        <strong>Driving License Issue Date: </strong>
                        {result.drivinglicenseissuedate}
                      </Card.Text>
                      <Card.Text>
                        <strong>Driving License Expire Date: </strong>
                        {result.drivinglicenseexpirydate}
                      </Card.Text>
                      <Card.Text>
                        <strong>Type of Vehicles: </strong>
                        {result.typeofvehicles}
                      </Card.Text>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <Footer />
    </div>
  );
};

export default GovernmentShowDetails;
