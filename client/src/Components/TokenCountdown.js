import React, { useState, useEffect } from "react";

const TokenCountdown = ({ expirationTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function calculateRemainingTime() {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return expirationTime - currentTime;
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  return (
    <div style={{ color: "red" }}>
      Token Expires in: {formatTime(remainingTime)}
    </div>
  );
};

export default TokenCountdown;
