import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const CitizenViewAcceptedRequests = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const nic = decodedToken.NIC;

  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/viewacceptedrequestsofcitizen/${nic}`
        );
        if (response.status === 200) {
          setAcceptedRequests(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error Fetching Accepted Requests: ", error);
        setLoading(false);
      }
    };

    fetchAcceptedRequests();
  }, [nic]);

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
                {acceptedRequests.map((request, index) => (
                  <Card key={request.Key} className="mb-3">
                    <Card.Body>
                      <Card.Title>
                        Request ID: {request.Record.reqid}
                      </Card.Title>
                      <Card.Text>
                        Requested By: {request.Record.requestedby}
                        <br />
                        Status: {request.Record.status}
                        <br />
                        Variables: {request.Record.variables}
                      </Card.Text>
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

export default CitizenViewAcceptedRequests;
