import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Info from "../../../assets/userScreenSvg/info.svg";
import "./index.css";

const CustomInput = ({
  label,
  onChange,
  placeholder,
  type = "text",
  isIcon = false,
  setShowPassword,
  labelClass,
  inputStyle,
  numericOnly,
  defaultValue,
  isinfo = false,
  id,
  uploadLabel,
  disable = false,
}) => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    setFileName(e.target.files[0].name);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <p className={labelClass ? labelClass : "field-title-login"}>
        {isinfo ? (
          <>
            {label}
            <img src={Info} alt="info" className="ms-1" />
          </>
        ) : (
          label
        )}
      </p>
      {type !== "file" ? (
        <input
          defaultValue={defaultValue ? defaultValue : ""}
          onChange={onChange}
          className={inputStyle ? inputStyle : "input-field"}
          type={type}
          placeholder={placeholder}
          disabled={disable}
          onKeyPress={
            numericOnly
              ? (e) => {
                  const key = e.key;
                  if (isNaN(key)) {
                    e.preventDefault(); // Prevent entering non-numeric characters
                  }
                }
              : null
          }
        />
      ) : (
        <div className="custom-file-upload">
          <span className="file-name">{fileName || placeholder}</span>
          <input
            id={id}
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <label htmlFor={id} className="custom-file-label">
            {uploadLabel ? uploadLabel : "Upload"}
          </label>
        </div>
      )}

      {isIcon && (
        <>
          {type === "password" ? (
            <FaEyeSlash
              className="password-toggle-icon"
              onClick={setShowPassword}
            />
          ) : (
            <FaEye className="password-toggle-icon" onClick={setShowPassword} />
          )}
        </>
      )}
    </div>
  );
};

export default CustomInput;
