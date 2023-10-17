import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import jwtDecode from "jwt-decode";
import Loader from "../Loader/loader";

const CitizenViewPendingRequests = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const nic = decodedToken.NIC;

  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/viewpendingrequestsofcitizen/${nic}`
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

  const handleAcceptRequest = async (request) => {
    try {
      const response = await axios.post(
        `http://localhost:8090/acceptrequest/${request.Record.reqid}`,
        { NIC: nic }
      );
      if (response.status === 200) {
        console.log("Request Accepted:", request.id);
        // Refresh the pending requests list
        fetchPendingRequests();
      }
    } catch (error) {
      console.error("Error Accepting Request: ", error.message);
    }
  };

  const handleViewRequest = (request) => {
    navigate(`/viewrequest/${request.Record.reqid}`);
  };

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
                        Requested By: {request.Record.requestedby}
                        <br />
                        Status: {request.Record.status}
                      </Card.Text>
                      <Button
                        variant="success"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        className="ml-2"
                        onClick={() => handleViewRequest(request)}
                      >
                        View
                      </Button>
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

export default CitizenViewPendingRequests;
