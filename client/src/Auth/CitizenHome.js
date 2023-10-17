import React from "react";
import CitizenDetails from "../Screens/CitizenDetails";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Home = () => {
  const token = localStorage.getItem("Token");

  return (
    <div>
      <Navbar />
      <CitizenDetails token={token} />
      <Footer />
    </div>
  );
};

export default Home;
