import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card } from "react-bootstrap";

import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Loader from "../Loader/loader";
import jwtDecode from "jwt-decode";

const OrgViewPendingRequests = () => {
  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const orgID = decodedToken.id;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/viewpendingrequestsoforg/${orgID}`
      );
      if (response.status === 200) {
        setPendingRequests(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error Fetching Pending Requests: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Pending Requests</h2>
            {loading ? (
              <Loader />
            ) : (
              <>
                {pendingRequests.map((request, index) => (
                  <Card key={request.Key} className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        Request ID: {request.Record.reqid}
                      </Card.Title>
                      <Card.Text>
                        Requested For: {request.Record.NIC}
                        <br />
                        Status: {request.Record.status}
                        <br />
                        Variables: {request.Record.variables}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default OrgViewPendingRequests;
