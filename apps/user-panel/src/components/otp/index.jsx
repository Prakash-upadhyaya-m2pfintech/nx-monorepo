import React, { useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import CountdownTimer from "./timer";
import { verifyOTP } from "../../api/users";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CustomButton from "../core/Button";

export default function OneTimePassword() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const location = useLocation();
  let email = location.state?.email;

  const hanldeVerifyOTP = () => {
    if (otp.length === 6) {
      const body = {
        email: email,
        otp: Number(otp),
      };
      verifyOTP(body)
        .then((res) => {
          if (res) {
            navigate("/user/forgetScreen", {
              state: {
                email: email,
              },
            });
          } else {
            showErrorMessage();
          }
        })
        .catch((err) => {
          showErrorMessage(JSON.stringify(err));
        });
    } else {
      showErrorMessage("Enter valid OTP");
    }
  };

  return (
    <div className="main-forget">
      <img src={Logo} alt="logo" />
      <div className="body-forget">
        <div className="forget-sec">
          <div>
            <CustomHeader
              title={"Digital Onboarding Platform"}
              description={"Forgot Password"}
              subDescription={
                "Please Enter the OTP received to 987654**** or your mail ID AB****@gmail.com to change the Password."
              }
              isforgetStyle={"forget-form-heading"}
            />

            <div className="otp-dev">
              <p className="field-title-login">Enter OTP</p>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => <input {...props} />}
                placeholder="______"
                isInputSecure
                containerStyle={{ gap: "17px" }}
                inputStyle={{
                  border: "1px solid  #DDE2E5",
                  boxShadow: "0px 1px 2px rgba(31, 30, 36, 0.1)",
                  width: "16.6%",
                  padding: "3%",
                  borderRadius: 8,
                  // margin: 5,
                  paddingTop: "15px",
                }}
              />
            </div>
            <p className="timer">
              <CountdownTimer />
            </p>
          </div>
          <CustomButton title={"Verify OTP"} handleFunction={hanldeVerifyOTP} />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
