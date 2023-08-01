import React from "react";

const CustomButton = ({
  title,
  handleFunction,
  className,
  isIcon,
  isleft = false,
}) => {
  return (
    <button
      onClick={handleFunction}
      className={className ? className : "btn-login"}
    >
      {isleft ? (
        isIcon && (
          <>
            <img src={isIcon} alt="icon" /> {title}
          </>
        )
      ) : (
        <>
          {title}
          {isIcon && <img src={isIcon} alt="icon" />}
        </>
      )}
    </button>
  );
};

export default CustomButton;
