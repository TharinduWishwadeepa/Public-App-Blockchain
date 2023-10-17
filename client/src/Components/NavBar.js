import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loader from "../Loader/loader";
import "./css/NavBar.css";
import TokenCountdown from "./TokenCountdown";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPageUrl = location.pathname;
  // /organizationHome

  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      setLoader(true);
      localStorage.removeItem("Token");
      navigate("/");
      setLoader(false);
    } catch (error) {
      console.log("Error Logout! ", error);
      setLoader(false);
    }
  };
  const token = localStorage.getItem("Token");
  const decodedToken = token ? decodeToken(token) : {};
  const role = decodedToken.role;
  const name = decodedToken.name;
  const exp = decodedToken.exp;

  return (
    <nav className="navbar">
      {loader && <Loader />}
      <div className="navbar-left">
        <Link
          to={
            role === "citizen"
              ? "/citizenHome"
              : role === "org"
              ? "/organizationHome"
              : "/governmentHome"
          }
        >
          <span className="app-name">BlockChain .</span>
        </Link>
      </div>
      <div className="navbar-right">
        <div className="nav-options">
          <span>
            {currentPageUrl !== "/organizationHome" && (
              <TokenCountdown expirationTime={exp} />
            )}
          </span>
          {role === "citizen" && (
            <Link to="/viewpendingrequestsofcitizen" className="nav-link">
              Pending Requests
            </Link>
          )}
          {role === "citizen" && (
            <Link to="/viewacceptedrequestsofcitizen" className="nav-link">
              Accepted Requests
            </Link>
          )}
          {role === "org" && (
            <Link to="/createrequest" className="nav-link">
              Create Requests
            </Link>
          )}
          {role === "org" && (
            <Link to="/viewpendingrequestsoforg" className="nav-link">
              Pending Requests
            </Link>
          )}
          {role === "org" && (
            <Link to="/viewacceptedrequestsoforg" className="nav-link">
              Accepted Requests
            </Link>
          )}

          <div className="user-dropdown">
            <button className="user-dropdown-button" onClick={handleToggle}>
              Hi {role === "citizen" ? role : name} <span>&#9662;</span>
            </button>
            {isOpen && (
              <div className="user-dropdown-menu">
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log("Invalid token specified");
    return {};
  }
};

export default Navbar;
