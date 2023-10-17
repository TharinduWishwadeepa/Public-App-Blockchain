import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import CitizenAuthCss from "./css/CitizenAuth.module.css";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/loader";
import Footer from "../Components/Footer";

const CitizenAuth = () => {
  const navigate = useNavigate();

  const [LoginNic, setLoginNic] = useState("");
  const [LoginPassword, setLoginPassword] = useState("");

  const [registerNIC, setRegisterNIC] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confPass, setConfPass] = useState("");

  const [loader, setLoader] = useState(false);

  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (LoginNic.trim() === "") {
      setError("Please Provide NIC Number!");
      return;
    }
    if (LoginPassword.trim() === "") {
      setError("Please Provide Password!");
      return;
    }
    try {
      setLoader(true);
      await axios
        .post("http://localhost:8090/auth/citizen/login", {
          LoginNic: LoginNic,
          LoginPassword: LoginPassword,
        })
        .then((res) => {
          const authToken = res.data;
          if (authToken) {
            localStorage.setItem("Token", authToken);
            navigate("/citizenHome", { state: { token: authToken } });
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

    const nicRegex = /^(\d{9}[V|X])|(\d{12})$/i;

    if (registerNIC.trim() === "") {
      setError2("NIC Number Cannot be Empty!");
      return;
    }
    if (!nicRegex.test(registerNIC)) {
      setError2("Incorrect NIC Number!");
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
        .post("http://localhost:8090/auth/citizen/register", {
          registerNIC: registerNIC,
          registerPassword: registerPassword,
        })
        .then((res) => {
          if (res.data.NIC === registerNIC) {
            setLoader(false);
            alert("New Citizen Added Succesfully!");
          } else if (res.data.NIC !== registerNIC) {
            setLoader(false);
            setError2("Citizen Not Registered In!");
          }
        })
        .catch((e) => {
          setError2("Seems like User Alredy Exist! " + e.message);
          setLoader(false);
        });
    } catch (error) {
      setError2("Something went Wrong!");
      setLoader(false);
    }
  };

  return (
    <div>
      <div className={CitizenAuthCss.cust1}>
        <h1>Citizen Authentication Page</h1>
      </div>
      <Container className={CitizenAuthCss.cont}>
        <div className={CitizenAuthCss.authcontainer}>
          <Row className={`justify-content-between ${CitizenAuthCss.custom}`}>
            {/* Login Form */}
            <Col md={5} className={CitizenAuthCss.bord}>
              <h2>Login</h2>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="login-email">NIC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="login-email"
                    placeholder="Ex: 982412510V"
                    value={LoginNic}
                    onChange={(e) => {
                      setLoginNic(e.target.value);
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
                {error && (
                  <p className={CitizenAuthCss.errormessage}>{error}</p>
                )}
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
            <Col md={5} className={CitizenAuthCss.bord}>
              <h2>Register</h2>
              <hr />
              <form>
                <div className="form-group">
                  <label htmlFor="register-nic">NIC</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-email"
                    placeholder="Ex: 982412510V"
                    value={registerNIC}
                    onChange={(e) => {
                      setRegisterNIC(e.target.value);
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
                {error2 && (
                  <p className={CitizenAuthCss.errormessage}>{error2}</p>
                )}
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

export default CitizenAuth;
