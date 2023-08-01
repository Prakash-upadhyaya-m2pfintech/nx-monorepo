import React, { useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import Google from "../../assets/signUp/google-icon.svg";
import Outlook from "../../assets/signUp/outlook.svg";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { login } from "../../api/users";
import { setAccessToken } from "../../api/common";
import { toast } from "react-toastify";
import CustomButton from "../core/Button";
import CustomInput from "../core/InputField";
import CustomHeader from "../core/Header";
import CustomFooter from "../core/Footer";
export default function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showSuccessMessage = () => {
    toast.success("User login successfully!.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleLogin = () => {
    if (loginData && loginData.email && loginData.password) {
      login(loginData)
        .then((res) => {
          if (res) {
            showSuccessMessage();
            setAccessToken(res.token);
            navigate("/home");
          } else {
            showErrorMessage("Invalid email or password");
          }
        })
        .catch((err) => {
          showErrorMessage(
            "Unable to Login Please check Username or Password",
            err
          );
        });
    } else {
      showErrorMessage("All Fields are required");
    }
  };
  return (
    <div className="main-login">
      <img src={Logo} alt="logo" />
      <div className="body-login">
        <div className="login-sec">
          <div>
            <CustomHeader
              title={"Digital Onboarding Platform"}
              description={
                "We needed few more details about you, please enter below."
              }
            />
            <CustomInput
              label={"Email ID"}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder={"example@example.com"}
            />
            <CustomInput
              label={"Password"}
              onChange={(e) =>
                setLoginData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="∗∗∗∗∗"
              type={showPassword ? "text" : "password"}
              setShowPassword={() => setShowPassword(!showPassword)}
              isIcon
            />
            <p className="blue-text" onClick={() => navigate("/user/forget")}>
              Forgot Password?
            </p>
          </div>
          <div>
            <CustomButton handleFunction={handleLogin} title={"Login"} />
            <p className="btn-desc">
              Don't have an account?{" "}
              <span onClick={() => navigate("/user/signup")}>sign up</span>
            </p>
            <div className="linediv">
              <p className="line" />
              <p className="linetext">or Login with</p>
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
