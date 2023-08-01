import React, { useState } from "react";
import Logo from "../../assets/signUp/two-logo.svg";
import Fb from "../../assets/signUp/facebook.svg";
import linedin from "../../assets/signUp/linkedin.svg";
import Twitter from "../../assets/signUp/twitter.svg";
import Insta from "../../assets/signUp/instagram.svg";
import Crunch from "../../assets/signUp/crunchbase.svg";
import M2Plogo from "../../assets/signUp/m2p.svg";
import { useNavigate } from "react-router-dom";
import "./confirm.css";

export default function ConfirmSignUp() {
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
              Thank you for registering with ID Flow onboarding portal. Our Team
              is verifying your Profile, please click on the below button to
              confirm your account. We will Email you the User ID and Password
              to Log into Syntizen SWS Portal as soon as possible once you
              finished verification.
            </p>
            <button
              className="btn-confirm"
              onClick={() => navigate("/user/register")}
            >
              Confirm your Account
            </button>
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
        <div className="bottom-div">
          <img src={M2Plogo} alt="icon" />
          <p>2023 All Right Reserved.Powered by M2PFintech</p>
        </div>
      </div>
    </div>
  );
}
