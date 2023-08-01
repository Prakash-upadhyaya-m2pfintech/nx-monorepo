import React, { useRef } from "react";
import ChatBtn from "../../assets/userScreenSvg/chat-btn.svg";
import EmailBtn from "../../assets/userScreenSvg/email-btn.svg";
import CopyBtn from "../../assets/userScreenSvg/copy-btn.svg";
import Col from "react-bootstrap/Col";

import { copyToClipboard } from "../../util/helper";

export default function UserDetail({
  selected,
  showErrorMessage,
  showSuccessMessage,
}) {
  const textAreaRef = useRef(null);
  const handleCopy = (e) => {
    const textToCopy = textAreaRef.current.innerText;
    copyToClipboard(textToCopy, showErrorMessage, showSuccessMessage);
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row justify-content-between  sec2">
          <div style={{}}>
            <img
              src={selected.image}
              alt={selected.heading}
              height="45rem"
              width="45rem"
              className="rounded-img"
            />
            <h3 className="p-0 m-0 pt-3 headingText">{selected.full_name}</h3>
            <div className="d-flex flex-row pt-1 ">
              <p id="id-style">ID:{selected.id}</p>
              {selected.is_admin === true ? (
                <div className="role-div">Admin</div>
              ) : selected.is_admin === false ? (
                <div className="role-div">User</div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="chat-btn-div">
            <img src={ChatBtn} alt="" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <table>
          <tr>
            <th className="w-25 font_style p-0">Name</th>
            <td className="font_style_desc">{selected.full_name}</td>
          </tr>
          <tr>
            <th className="font_style p-0">Country</th>
            <td className="font_style_desc">
              {" "}
              {selected?.phone_number?.country_code}
            </td>
          </tr>
          <tr>
            <th className="font_style p-0">Phone</th>
            <td className="font_style_desc">
              {" "}
              {selected?.phone_number?.number}
            </td>
          </tr>
          <tr>
            <th className="font_style p-0">Type</th>
            <td className="font_style_desc">
              {selected.is_admin ? (
                "Admin"
              ) : selected.is_admin === false ? (
                "User"
              ) : (
                <></>
              )}
            </td>
          </tr>
          <tr>
            <th className="font_style p-0">Email</th>
            <td className="p-0 font_style_desc">
              <div className="d-flex flex-row justify-content-between email-field">
                <div className="d-flex flex-row justify-content-center align-items-center">
                  <p ref={textAreaRef} value="rowena@ravenclaw.com">
                    {selected.email}
                  </p>
                </div>

                <div className="d-flex flex-row justify-content-center align-items-center spacing-2">
                  <button className="border-0 copy-btn" onClick={handleCopy}>
                    <img src={CopyBtn} alt="icon" />
                  </button>

                  <button className="border-0">
                    <img src={EmailBtn} alt="icon" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th className="font_style p-0">Status</th>
            <td className="font_style_desc">
              {selected.disabled === true ? (
                "Deactivate"
              ) : selected.disabled === false ? (
                "Active"
              ) : (
                <></>
              )}
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}
