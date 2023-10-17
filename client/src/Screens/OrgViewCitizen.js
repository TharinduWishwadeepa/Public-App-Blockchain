import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Loader from "../Loader/loader";

const OrgViewCitizen = () => {
  const { reqid } = useParams();
  const location = useLocation();

  const { NIC } = location.state;

  const [citizenInfo, setCitizenInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCitizenInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/viewcitizenfromrequest/${reqid}`
      );
      if (response.status === 200) {
        setCitizenInfo(response.data);
        setLoading(false);
        console.log(citizenInfo); // this line for testing purpose
      }
    } catch (error) {
      console.error("Error Fetching Citizen Information: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCitizenInfo();
  }, []);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card>
                <Card.Header>
                  <h2>Request Details For {NIC}</h2>
                </Card.Header>
                <Card.Body>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Request ID:</td>
                        <td>{reqid}</td>
                      </tr>
                      <tr>
                        <td>Full Name:</td>
                        <td>{citizenInfo.fullname}</td>
                      </tr>
                      <tr>
                        <td>Birth Date:</td>
                        <td>{citizenInfo.birthdate}</td>
                      </tr>
                      <tr>
                        <td>Gender:</td>
                        <td>{citizenInfo.gender}</td>
                      </tr>
                      <tr>
                        <td>Address:</td>
                        <td>{citizenInfo.address}</td>
                      </tr>
                      <tr>
                        <td>Birth Place:</td>
                        <td>{citizenInfo.birthplace}</td>
                      </tr>
                      <tr>
                        <td>Father Name:</td>
                        <td>{citizenInfo.fathername}</td>
                      </tr>
                      <tr>
                        <td>Mother Name:</td>
                        <td>{citizenInfo.mothername}</td>
                      </tr>
                      <tr>
                        <td>Religion:</td>
                        <td>{citizenInfo.religion}</td>
                      </tr>
                      <tr>
                        <td>Nationality:</td>
                        <td>{citizenInfo.nationality}</td>
                      </tr>
                      <tr>
                        <td>Passport ID:</td>
                        <td>{citizenInfo.passportid}</td>
                      </tr>
                      <tr>
                        <td>Passport Issue Date:</td>
                        <td>{citizenInfo.passportissuedate}</td>
                      </tr>
                      <tr>
                        <td>Passport Expiry Date:</td>
                        <td>{citizenInfo.passportexpirydate}</td>
                      </tr>
                      <tr>
                        <td>Blood Group:</td>
                        <td>{citizenInfo.bloodgroup}</td>
                      </tr>
                      <tr>
                        <td>Driving License Issue Date:</td>
                        <td>{citizenInfo.drivinglicenseissuedate}</td>
                      </tr>
                      <tr>
                        <td>Driving License Expiry Date:</td>
                        <td>{citizenInfo.drivinglicenseexpirydate}</td>
                      </tr>
                      <tr>
                        <td>Type Of Vehicles:</td>
                        <td>{citizenInfo.typeofvehicles}</td>
                      </tr>
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
};

export default OrgViewCitizen;
