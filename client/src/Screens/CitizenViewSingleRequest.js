import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/loader";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../Components/Footer";
import Navbar from "../Components/NavBar";

const CitizenViewSingleRequest = () => {
  const { reqid } = useParams();
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/viewrequest/${reqid}`
        );
        if (response.status === 200) {
          setRequest(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error Fetching Request: ", error);
        setLoading(false);
      }
    };

    fetchRequest();
  }, [reqid]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <div className="text-center">
                <h2>Request Details For {request.NIC}</h2>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Request ID:</td>
                      <td>{request.reqid}</td>
                    </tr>
                    <tr>
                      <td>Requested By:</td>
                      <td>{request.requestedby}</td>
                    </tr>
                    <tr>
                      <td>Organization ID:</td>
                      <td>{request.orgID}</td>
                    </tr>
                    <tr>
                      <td>Request Status:</td>
                      <td>{request.status}</td>
                    </tr>
                    <tr>
                      <td>Request Type:</td>
                      <td>{request.type}</td>
                    </tr>
                    <tr>
                      <td>Requested Variables:</td>
                      <td>{request.variables}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      <Footer />
    </div>
  );
};

export default CitizenViewSingleRequest;
