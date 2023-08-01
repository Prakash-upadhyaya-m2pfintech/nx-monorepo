import React from "react";
import M2Plogo from "../../../assets/signUp/m2p.svg";
import { ToastContainer } from "react-toastify";

function CustomFooter() {
  return (
    <div className="bottom-div">
      <img src={M2Plogo} alt="icon" />
      <p>2023 All Right Reserved.Powered by M2PFintech</p>
      <ToastContainer />
    </div>
  );
}

export default CustomFooter;
