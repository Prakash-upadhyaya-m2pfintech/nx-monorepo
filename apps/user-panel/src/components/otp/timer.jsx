import React, { useState, useEffect } from "react";
import { getEmail, setEmail } from "../../api/common";
import { sendResetEmail } from "../../api/users";

const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(2);
  const [resend, setResend] = useState(false);
  const [remainingTime, setRemainingTime] = useState(minutes * 60);
  useEffect(() => {
    setRemainingTime(minutes * 60);
  }, [resend]);
  useEffect(() => {
    if (remainingTime <= 0) {
      setResend(true);
      return;
    }

    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, resend]);
  const email = getEmail();
  const displayMinutes = Math.floor(remainingTime / 60);
  const displaySeconds = remainingTime % 60;
  const handleResendOtp = () => {
    sendResetEmail(email)
      .then((res) => {
        if (res) {
          setMinutes(2);
          setResend(false);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  return (
    <div>
      {resend ? (
        <p className="otp-color-text" onClick={handleResendOtp}>
          Resend OTP
        </p>
      ) : (
        <p className="otp-color-text1">
          Resend OTP in {displayMinutes.toString().padStart(2, "0")}:
          {displaySeconds.toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
};

export default CountdownTimer;
