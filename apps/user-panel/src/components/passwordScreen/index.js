import React, { useEffect, useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import "../loginScreen/login.css";
import { checkUserRegister, resetPassword } from "../../api/users";
import { toast } from "react-toastify";
import CustomHeader from "../core/Header";
import CustomInput from "../core/InputField";
import CustomButton from "../core/Button";
import CustomFooter from "../core/Footer";

export default function PasswordScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");

  const [loginData, setLoginData] = useState({
    password: "",
    newPassword: "",
  });
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("e");
    const decode = window.atob(email);
    setEmailAddress(decode);
    const token = searchParams.get("Id");
    if (email && token) {
      const body = {
        email,
        token,
      };
      checkUserRegister(body)
        .then((res) => {
          if (res && res.message === "verification successful") {
            showSuccessMessage("Email verified ");
          } else {
            showErrorMessage();
            setTimeout(() => {
              navigate("/user/signup");
            }, 2000);
          }
        })
        .catch((err) => {
          showErrorMessage();
          setTimeout(() => {
            navigate("/user/signup");
          }, 2000);
        });
    }
  }, []);

  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showSuccessMessage = (res) => {
    toast.success(res ? res : "User created successfully! Please login.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const handleSignup = () => {
    if (loginData.password === "" && loginData.newPassword === "") {
      showErrorMessage("Please enter password");
    } else if (loginData.password === loginData.newPassword) {
      const data = {
        email: emailAddress,
        password: loginData.password,
      };
      resetPassword(data)
        .then((res) => {
          if (res) {
            showSuccessMessage();
            navigate("/user/login");
          }
        })
        .catch((err) => {
          showErrorMessage("unable to create user with ", err);
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
            <CustomInput
              label={"Re-enter new password"}
              onChange={(e) =>
                setLoginData((prev) => ({
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
            handleFunction={handleSignup}
          />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
