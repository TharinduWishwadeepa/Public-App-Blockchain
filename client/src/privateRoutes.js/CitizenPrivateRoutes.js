import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";

const CitizenPrivateRoutes = () => {
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("Token");
  let decodeToken;
  let role;
  let exp;

  const logout = () => {
    // Perform the logout action, e.g., clearing local storage, redirecting to the login page
    localStorage.removeItem("Token");
    navigate("/"); // Redirect to the login page
  };

  useEffect(() => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (exp && exp < currentTime) {
      setExpired(true);
      // Token has expired
      logout();
    }
  }, [exp]);

  try {
    decodeToken = jwtDecode(token);
    role = decodeToken.role;
    exp = decodeToken.exp;
    console.log("exp" + expired);
    console.log(logout);
  } catch (error) {
    return <Navigate to="/" />;
  }

  return token && role === "citizen" && !expired ? (
    <Outlet />
  ) : (
    (localStorage.clear(), (<Navigate to="/" />))
  );
};

export default CitizenPrivateRoutes;
