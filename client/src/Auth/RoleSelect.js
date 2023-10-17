import React from "react";
import { Button, Container } from "react-bootstrap";
import "./css/RoleSelect.css";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const RoleSelect = () => {
  const navigate = useNavigate();
  const handleCitizenButton = () => {
    navigate("/citizenAuth");
  };
  const handleOrganizationButton = () => {
    navigate("/organizationAuth");
  };
  const handleGovernmentButton = () => {
    navigate("/governmentAuth");
  };

  return (
    <Container className="role-select">
      <h1 className="role-select-heading">Select Your Role</h1>
      <div className="role-select-buttons">
        <span className="role-select-text">Are You</span>
        <Button
          variant="primary"
          className="role-select-button"
          onClick={handleCitizenButton}
        >
          A Citizen
        </Button>
        Or
        <Button
          variant="success"
          className="role-select-button"
          onClick={handleOrganizationButton}
        >
          A Private Organization
        </Button>
        Or
        <Button
          variant="danger"
          className="role-select-button"
          onClick={handleGovernmentButton}
        >
          A Government Organization
        </Button>
      </div>
      <Footer />
    </Container>
  );
};

export default RoleSelect;
