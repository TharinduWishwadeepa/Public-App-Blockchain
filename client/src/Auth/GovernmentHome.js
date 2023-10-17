import React from "react";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import GovernmentSetNIC from "../Screens/GovernmentSetNIC";

const GovernmentHome = () => {
  return (
    <div>
      <Navbar />
      <GovernmentSetNIC />
      <Footer />
    </div>
  );
};

export default GovernmentHome;
