import React, { useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import Google from "../../assets/signUp/google-icon.svg";
import Outlook from "../../assets/signUp/outlook.svg";
import M2Plogo from "../../assets/signUp/m2p.svg";
import { useNavigate } from "react-router-dom";
import { sendEmail } from "../../api/users";
import { setEmail } from "../../api/common";
import { ToastContainer, toast } from "react-toastify";
import CustomHeader from "../core/Header";
import CustomInput from "../core/InputField";
import CustomFooter from "../core/Footer";
import CustomButton from "../core/Button";

export default function SignUp() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showSuccessMessage = () => {
    toast.success("Email sent Successfully!.Please check your email.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSendEmail = () => {
    if (userEmail) {
      if (isChecked === true) {
        setEmail(userEmail);
        sendEmail(userEmail)
          .then((res) => {
            if (res) {
              showSuccessMessage();
              console.log({ res });
            } else {
              showErrorMessage();
            }
          })
          .catch((err) => {
            showErrorMessage(err?.message);
            console.log({ err });
          });
      } else {
        showErrorMessage("Please Agree to the terms and condition");
      }
    } else {
      showErrorMessage("Please Enter Email");
    }
  };
  return (
    <div className="main-signup">
      <img src={Logo} alt="logo" />
      <div className="body-signup">
        <div className="signup-sec">
          <div>
            <CustomHeader title={"Sign Up for free trial"} />
            <CustomInput
              label={"Email Id"}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Abc@gmail.com"
            />
            <div className="checkbox-div">
              <input
                onChange={(e) => {
                  setIsChecked(!isChecked);
                }}
                type="checkbox"
              />
              <label className="labelstyle">
                I Agree to the{" "}
                <span className="signup-span">Terms and Conditions</span>
              </label>
            </div>
          </div>
          <div>
            <CustomButton handleFunction={handleSendEmail} title={"Sign Up"} />
            <p className="btn-desc">
              Do you have an account?{" "}
              <span onClick={() => navigate("/user/login")}>sign in</span>
            </p>
            <div className="linediv">
              <p className="line" />
              <p className="linetext">or Sign up with</p>
              <p className="line" />
            </div>
            <div className="btn-div">
              <button className="icon-btn">
                <img src={Google} alt="icon" />
                Google
              </button>
              <button className="icon-btn">
                <img src={Outlook} alt="icon" />
                Outlook
              </button>
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
