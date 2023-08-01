import React, { useState } from "react";
import Logo from "../../assets/signUp/two-logo.svg";
import Fb from "../../assets/signUp/facebook.svg";
import linedin from "../../assets/signUp/linkedin.svg";
import Twitter from "../../assets/signUp/twitter.svg";
import Insta from "../../assets/signUp/instagram.svg";
import Crunch from "../../assets/signUp/crunchbase.svg";
import M2Plogo from "../../assets/signUp/m2p.svg";
import { useNavigate } from "react-router-dom";
import "./index.css";
import CustomButton from "../core/Button";

export default function SetPassword() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: "",
  });

  return (
    <div className="main-signupConfirm">
      <img src={Logo} alt="logo" className="logo" />
      <div className="body-signupConfirm">
        <div className="body-sec">
          <div>
            <p className="title">Hello Saravanan</p>
            <p className="title-desc">
              Thank you for registering with ID Flow onboarding portal. Please
              set your new password to proceed with the account.
            </p>
            <CustomButton
              title={" Set New Password"}
              handleFunction={() => navigate("/user/passwordscreen")}
              className={"btn-confirm"}
            />
            <p className="desc">
              If you did not initiate this request, please contact us
              immediately at <span>Support@Syntizen.com</span>
            </p>
            <p>
              Thank you,
              <br /> Syntizen Team
            </p>
          </div>
        </div>
        <div className="icon-div">
          <img src={Fb} alt="icon" />
          <img src={linedin} alt="icon" />
          <img src={Twitter} alt="icon" />
          <img src={Insta} alt="icon" />
          <img src={Crunch} alt="icon" />
        </div>
        <p className="icon-desc">
          {
            "You're receiving this email because you are a customer of <company Name>"
          }
          .
        </p>
        <div className="bottom-div-setpsd">
          <img src={M2Plogo} alt="icon" />
          <p>2023 All Right Reserved.Powered by M2PFintech</p>
        </div>
      </div>
    </div>
  );
}
