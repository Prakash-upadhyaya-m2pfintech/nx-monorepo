import React, { useState } from "react";
import Info from "../../../assets/userScreenSvg/info.svg";
import "./index.css";

function CustomSelect({
  title,
  options,
  onChange,
  className,
  titleClass,
  defaultValue,
  inInfo = false,
  selectfield = false,
  selectwidth = "",
  isDict = false,
  setOrganization,
}) {
  const handleChange = (event) => {
    const select = event.target.value;
    const selectedOption = options.find((option) => option.id === select);
    if (setOrganization) {
      setOrganization(selectedOption?.organization);
    }
    if (onChange) {
      onChange(event);
    }
  };

  const widthChangeOptions = [options[0], options[1]]; // Set the options that should trigger the width change

  return (
    <>
      <p className={titleClass ? titleClass : "full-field-title"}>
        {inInfo === true ? (
          <>
            {title}
            <img src={Info} alt="info" className="ms-2" />
          </>
        ) : (
          title
        )}
      </p>
      <select
        required
        onChange={handleChange}
        className={className ? className : "select-menu"}
        defaultValue={defaultValue ? defaultValue : ""}
      >
        {selectfield && (
          <option value="" disabled>
            Select any
          </option>
        )}

        {options &&
          options.map((option, index) => {
            return (
              <>
                {" "}
                {isDict ? (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ) : (
                  <option key={index} value={option}>
                    {option}
                  </option>
                )}
                ;
              </>
            );
          })}
      </select>
    </>
  );
}

export default CustomSelect;
