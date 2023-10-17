import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner">
        <Spinner
          animation="border"
          role="status"
          style={{
            width: "100px",
            height: "100px",
            margin: "auto",
            display: "block",
          }}
        >
          <span className="sr-only">Loading..</span>
        </Spinner>
      </div>
    </div>
  );
};

export default Loader;
