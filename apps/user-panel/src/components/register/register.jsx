import React, { useEffect, useState } from "react";
import Logo from "../../assets/idflow-logo.svg";
import BgImage from "../../assets/signUp/bg-image.svg";

import { useNavigate } from "react-router-dom";
import "../loginScreen/login.css";
import { toast } from "react-toastify";
import CustomHeader from "../core/Header";
import CustomInput from "../core/InputField";
import CustomSelect from "../core/CustomSelect";
import CustomButton from "../core/Button";
import CustomFooter from "../core/Footer";
import "./index.css";
import { useLocation } from "react-router-dom";
import { checkUserRegister, createUser } from "../../api/users";

export default function Register() {
  const navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState({
    firstName: "",
    lastName: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const options = ["Fintech", "Others"];
  const serviceOption = ["Bank", "Others"];
  const countryCodeOptions = ["+91", "+92"];

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
            showSuccessMessage();
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
    toast.error(err ? err : "Email not verified", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showSuccessMessage = (success) => {
    toast.success(success ? success : "Email verification Successful", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const [formDetails, setFormDetails] = useState({
    full_name: "",
    organization: "Fintech",
    organization_name: "",
    phone_number: {
      country_code: "+91",
      number: "",
    },
    email: "",
    service: "Bank",
  });
  useEffect(() => {
    setFormDetails((prev) => ({
      ...prev,
      full_name: username.firstName + " " + username.lastName,
      email: emailAddress,
    }));
  }, [username, emailAddress]);
  const handleSignUp = () => {
    if (
      formDetails.email &&
      formDetails.full_name &&
      formDetails.organization &&
      formDetails.organization_name &&
      formDetails.service &&
      formDetails.phone_number.country_code &&
      formDetails.phone_number.number
    ) {
      if (isChecked === true)
        createUser(formDetails)
          .then((res) => {
            if (res) {
              showSuccessMessage(
                "Set password Email sent to you account please check it."
              );
            }
          })
          .catch((err) => {
            showErrorMessage();
          });
    } else {
      showErrorMessage("All field are required!");
    }
  };
  return (
    <div className="main">
      <div className="main-signupdetails">
        <img src={Logo} alt="logo" />
        <div className="body-signupdetails">
          <img src={BgImage} className="register-bg" />
          <div className="form-sec">
            <div>
              <CustomHeader
                title={"Digital Onboarding Platform"}
                description={
                  "We needed few more details about you, please enter below."
                }
              />
              <div className="field-div">
                <CustomInput
                  label={"First Name"}
                  onChange={(e) =>
                    setUsername((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="First name"
                  labelClass="field-titl"
                />
                <CustomInput
                  label={"Last Name"}
                  onChange={(e) =>
                    setUsername((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Last name"
                  labelClass="field-titl"
                />
              </div>
              <CustomSelect
                title={"Signed up as"}
                onChange={(e) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    organization: e.target.value,
                  }))
                }
                options={options}
              />
              <CustomInput
                label={"Organisation Name"}
                onChange={(e) =>
                  setFormDetails((prev) => ({
                    ...prev,
                    organization_name: e.target.value,
                  }))
                }
                placeholder="Organisation"
              />

              <p className="full-field-title">Mobile Number</p>
              <div className="select-input-register">
                <CustomSelect
                  className="half-select-phone"
                  options={countryCodeOptions}
                  onChange={(e) =>
                    setFormDetails((prev) => ({
                      ...prev,
                      phone_number: {
                        ...prev.phone_number,
                        country_code: e.target.value,
                      },
                    }))
                  }
                />
                <div className="customPhoneNUmberInput">
                  <CustomInput
                    onChange={(e) =>
                      setFormDetails((prev) => ({
                        ...prev,
                        phone_number: {
                          ...prev.phone_number,
                          number: e.target.value,
                        },
                      }))
                    }
                    placeholder="9876543210"
                    numericOnly
                    inputStyle="half-field-phone"
                  />
                </div>
              </div>
              <CustomSelect
                title={"How would like to use our services? *"}
                onChange={(e) =>
                  setFormDetails((prev) => ({ ...prev, bank: e.target.value }))
                }
                options={serviceOption}
              />

              <div className="check-box-div">
                <input
                  onChange={(e) => {
                    setIsChecked(!isChecked);
                  }}
                  type="checkbox"
                  required
                />
                <label className="labelstyle">
                  I Agree to the{" "}
                  <span className="register-span">Terms and Conditions</span>
                </label>
              </div>
              <div className="mt-16"></div>
            </div>
            <div>
              <CustomButton title={"Sign Up"} handleFunction={handleSignUp} />
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </div>
  );
}
