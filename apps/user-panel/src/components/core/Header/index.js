import React from "react";

const CustomHeader = ({
  title,
  description,
  subDescription,
  isforgetStyle,
}) => {
  return (
    <div>
      <p className="title-login">{title}</p>
      <p
        className={
          subDescription && isforgetStyle
            ? isforgetStyle
            : subDescription
            ? "login-form-desc1"
            : "login-form-desc"
        }
      >
        {description}
      </p>
      <p className={isforgetStyle ? "forget-form-desc" : "login-form-desc2"}>
        {subDescription}
      </p>
    </div>
  );
};

export default CustomHeader;
