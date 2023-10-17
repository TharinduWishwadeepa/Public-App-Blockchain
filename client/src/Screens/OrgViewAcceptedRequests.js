import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Loader from "../Loader/loader";
import jwtDecode from "jwt-decode";

const OrgViewAcceptedRequests = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const orgID = decodedToken.id;

  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/viewacceptedrequestsoforg/${orgID}`
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

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  const handleViewRequest = (request) => {
    navigate(`/viewcitizenfromrequest/${request.Record.reqid}`, {
      state: { NIC: request.Record.NIC },
    });
  };

  return (
    <div>
      <Navbar />
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2>Accepted Requests</h2>
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
                        Requested For: {request.Record.NIC}
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
                        View Citizen
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

export default OrgViewAcceptedRequests;
