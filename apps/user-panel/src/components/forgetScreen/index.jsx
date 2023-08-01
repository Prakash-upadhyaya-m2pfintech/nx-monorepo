import React, { useState } from "react";
import Logo from "../../assets/idflow-logo.svg";

import { useNavigate } from "react-router-dom";
import "../loginScreen/login.css";
import { resetPassword } from "../../api/users";
import { getEmail, setEmail } from "../../api/common";
import { toast, ToastContainer } from "react-toastify";
import CustomHeader from "../core/Header";
import CustomInput from "../core/InputField";
import CustomFooter from "../core/Footer";
import CustomButton from "../core/Button";

export default function ForgetScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const emailaddress = getEmail();

  const [resetPassword, setResetPassword] = useState({
    password: "",
    newPassword: "",
  });
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleReset = () => {
    if (resetPassword.password === "" && resetPassword.newPassword === "") {
      showErrorMessage("Please enter password");
    } else if (resetPassword.password === resetPassword.newPassword) {
      const body = {
        email: emailaddress,
        password: resetPassword.password,
      };
      resetPassword(body)
        .then((res) => {
          if (res && res.token) {
            setEmail(null);
            navigate("/user/login");
          }
        })
        .catch((err) => {
          showErrorMessage("Unable to set password due to some reason", err);
        });
    } else {
      showErrorMessage("Password not matched");
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
              description={"Welcome back!"}
              subDescription={"Please create new password"}
            />

            <CustomInput
              label={"Password"}
              onChange={(e) =>
                setResetPassword((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="∗∗∗∗∗"
              type={showPassword ? "text" : "password"}
              setShowPassword={() => setShowPassword(!showPassword)}
              isIcon
            />
            <CustomInput
              label={"Re-enter new password"}
              onChange={(e) =>
                setResetPassword((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              placeholder="∗∗∗∗∗"
              type={showPassword1 ? "text" : "password"}
              setShowPassword={() => setShowPassword1(!showPassword1)}
              isIcon
            />
          </div>
          <CustomButton
            title={"Change Password"}
            handleFunction={handleReset}
          />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
