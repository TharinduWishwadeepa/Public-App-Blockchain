import Navbar from "../Components/NavBar";
import React from "react";
import Footer from "../Components/Footer";
import OrganizationDetails from "../Screens/OrganizationDetails";

const OrganizationHome = () => {
  const token = localStorage.getItem("Token");
  return (
    <div>
      <Navbar />
      <OrganizationDetails />
      <Footer />
    </div>
  );
};

export default OrganizationHome;
