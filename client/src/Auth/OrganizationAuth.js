import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import OrgAuthCss from "./css/OrganizationAuth.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import Footer from "../Components/Footer";

const OrganizationAuth = () => {
  const navigate = useNavigate();

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const [loader, setLoader] = useState(false);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (LoginEmail.trim() === "") {
      setError("Please Provide Email Address!");
      return;
    }
    if (LoginPassword.trim() === "") {
      setError("Please Provide Password!");
      return;
    }
    try {
      setLoader(true);
      await axios
        .post("http://localhost:8090/auth/organization/login", {
          email: LoginEmail,
          password: LoginPassword,
        })
        .then((res) => {
          const authToken = res.data;
          if (authToken) {
            localStorage.setItem("Token", authToken);
            navigate("/organizationHome", { state: { token: authToken } });
            localStorage.setItem(authToken);
            setLoader(false);
          } else {
            setError("User Not Signed in !");
            setLoader(false);
          }
        })
        .catch((e) => {
          setError("Incorrect Credentials! " + e.message);
          setLoader(false);
        });
    } catch (error) {
      setError("Something went Wrong!");
      setLoader(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError2("");

    const emailRegex = /\S+@\S+\.\S+/;

    if (registerEmail.trim() === "") {
      setError2("Email Cannot be Empty!");
      return;
    }
    if (!emailRegex.test(registerEmail)) {
      setError2("Incorrect Email Address!");
      return;
    }
    if (registerName.trim() === "") {
      setError2("Name Cannot be Empty!");
      return;
    }
    if (registerName.length < 4) {
      setError2("Name is Too Short!");
      return;
    }
    if (registerPassword.trim() === "") {
      setError2("Password Cannot be Empty!");
      return;
    }
    if (registerPassword.length < 8) {
      setError2("Password is too Short!");
      return;
    }
    if (confPass !== registerPassword) {
      setError2("Passwords Missmatch!");
      return;
    }
    try {
      setLoader(true);
      await axios
        .post("http://localhost:8090/auth/organization/register", {
          email: registerEmail,
          name: registerName,
          password: registerPassword,
        })
        .then((res) => {
          if (res.data.email === registerEmail) {
            setLoader(false);
            alert("New Organization Added Succesfully!");
          } else if (res.data.email !== registerEmail) {
            setLoader(false);
            setError2("Organization Not Registered In!");
          }
        })
        .catch((e) => {
          setError2("Seems like Organization Alredy Exist! " + e.message);
          setLoader(false);
        });
    } catch (error) {
      setError2("Something went Wrong!");
      setLoader(false);
    }
  };

  return (
    <div>
      <div className={OrgAuthCss.cust1}>
        <h1>Private Organization Authentication Page</h1>
      </div>
      <Container className={OrgAuthCss.cont}>
        <div className={OrgAuthCss.authcontainer}>
          <Row className={`justify-content-between ${OrgAuthCss.custom}`}>
            {/* Login Form */}
            <Col md={5} className={OrgAuthCss.bord}>
              <h2>Login</h2>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="login-email"
                    placeholder="Ex: org1@gmail.com"
                    value={LoginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="login-password"
                    value={LoginPassword}
                    placeholder="Ex: 12345678"
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                    }}
                  />
                </div>
                {error && <p className={OrgAuthCss.errormessage}>{error}</p>}
                <button
                  type="submit"
                  className="btn btn-primary mt-3 w-100"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </Col>
            {loader && <Loader />}
            {/* register Form */}
            <Col md={5} className={OrgAuthCss.bord}>
              <h2>Register</h2>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="register-nic">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-email"
                    placeholder="Ex: org1@mail.com"
                    value={registerEmail}
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-name"
                    value={registerName}
                    placeholder="Ex: Organization 1"
                    onChange={(e) => {
                      setRegisterName(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password"
                    value={registerPassword}
                    placeholder="Ex: 12345678"
                    onChange={(e) => {
                      setRegisterPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-password2">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="register-password2"
                    value={confPass}
                    placeholder="Ex: 12345678"
                    onChange={(e) => {
                      setConfPass(e.target.value);
                    }}
                  />
                </div>
                {error2 && <p className={OrgAuthCss.errormessage}>{error2}</p>}
                <button
                  type="submit"
                  className="btn btn-success mt-1 w-100"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </form>
            </Col>
          </Row>
        </div>
        <Footer />
      </Container>
    </div>
  );
};

export default OrganizationAuth;
