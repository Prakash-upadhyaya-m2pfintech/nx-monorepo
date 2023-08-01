import React, { useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import { sendResetEmail } from "../../api/users";
import { useNavigate } from "react-router-dom";
import "../loginScreen/login.css";
import { setEmail as setEmailToLocalStorage } from "../../api/common";
import { toast } from "react-toastify";
import CustomHeader from "../core/Header";
import CustomInput from "../core/InputField";
import CustomButton from "../core/Button";
import CustomFooter from "../core/Footer";

export default function ForgetPasswordEmail() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSendResetEmail = () => {
    if (email) {
      sendResetEmail(email)
        .then((res) => {
          if (res) {
            console.log("successfully sent email", res);
            setEmailToLocalStorage(email);

            navigate("/user/otp", {
              state: {
                email: email,
              },
            });
          }
        })
        .catch((err) => {
          showErrorMessage("Unable to send forget email");
        });
    } else {
      showErrorMessage("Please enter email");
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
                "Please Enter the Email ID to proceed , we will send you the OTP to you."
              }
              isforgetStyle={"forget-form-heading"}
            />
            <CustomInput
              label={"Email ID"}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Abc@gmail.com"
            />
          </div>
          <CustomButton
            title={"Send Request"}
            handleFunction={handleSendResetEmail}
          />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
