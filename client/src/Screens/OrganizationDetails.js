import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import OrganizationDetailsCSS from "./css/OrganizationDetails.module.css";
import TokenCountdown from "../Components/TokenCountdown";

const OrganizationDetails = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  const decodedToken = jwtDecode(token);
  const name = decodedToken.name;
  const email = decodedToken.email;
  const createdAt = decodedToken.createdAt;
  const exp = decodedToken.exp;
  const id = decodedToken.id;

  const convertTime = (timestamp) => {
    const options = {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedTime = new Date(timestamp).toLocaleString("en-US", options);
    return formattedTime;
  };

  function convertToTimeFormat(timestamp) {
    const options = {
      timeZone: "Asia/Colombo",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    const formattedTime = new Date(timestamp * 1000).toLocaleString(
      "en-US",
      options
    );
    return formattedTime;
  }

  return (
    <Container className={OrganizationDetailsCSS.orgcontainer}>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
          lg={6}
          className={OrganizationDetailsCSS.orgdetails}
        >
          <Card bg="warning" text="white" className="shadow">
            <Card.Body>
              <Card.Title>Organization Details</Card.Title>
              <Card.Text>
                Name: {name}
                <br />
                Email: {email}
                <br />
                ID: {id}
                <br />
                Account Created At: {convertTime(createdAt)}
                <br />
                Access Declied At: {convertToTimeFormat(exp)}
                <br />
                <TokenCountdown expirationTime={exp} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrganizationDetails;
