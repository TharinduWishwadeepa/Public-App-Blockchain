import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import GovAuthCss from "./css/GovernmentAuth.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import Footer from "../Components/Footer";

const GovernmentAuth = () => {
  const navigate = useNavigate();

  const [LoginEmail, setLoginEmail] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

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
        .post("http://localhost:8090/auth/government/login", {
          email: LoginEmail,
          password: LoginPassword,
        })
        .then((res) => {
          const authToken = res.data;
          if (authToken) {
            localStorage.setItem("Token", authToken);
            navigate("/governmentHome", { state: { token: authToken } });
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
  return (
    <div>
      <div className={GovAuthCss.cust1G}>
        <h1>Government Organization Login Page</h1>
      </div>
      <Container>
        <div className={GovAuthCss.authcontainerG}>
          <Row className={`justify-content-center ${GovAuthCss.xyzG}`}>
            {/* Login Form */}
            <Col md={7} className={GovAuthCss.bordG}>
              <h3>Login</h3>
              <hr />
              <Form>
                <div className="form-group">
                  <label htmlFor="login-nic">Email Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="login-nic"
                    placeholder="Ex: govorg@gov.lk"
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
                {error && <p className={GovAuthCss.errormessage}>{error}</p>}
                <Button
                  type="submit"
                  className="btn btn-primary mt-4 w-100"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
        {loader && <Loader />}
        <Footer />
      </Container>
    </div>
  );
};

export default GovernmentAuth;
