import React, { useEffect, useRef } from "react";
import { useState } from "react";
import "./index.css";

import ChatBtn from "../../assets/userScreenSvg/chat-btn.svg";
import RmvIcon from "../../assets/userScreenSvg/remove-icon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../core/InputField";
import CustomSelect from "../core/CustomSelect";

export default function EditUser({
  setSwitchModal,
  selected,
  setUpdateUser,
  allFlows,
}) {
  const navigate = useNavigate();
  const [state, setState] = useState(selected.is_admin);
  const [item, setItem] = useState(selected?.flows ? selected?.flows : []);
  const [toggleIsActive, setToggleIsActive] = useState(
    selected.disabled === false ? true : false
  );
  const [userPic, setUserPic] = useState(selected.image);
  const [list, setList] = useState([
    {
      id: "1",
      name: "Flows",
      isActive: true,
    },
    {
      id: "2",
      name: "Groups",
      isActive: false,
    },
    {
      id: "3",
      name: "Accounts",
      isActive: false,
    },
    {
      id: "4",
      name: "Analytics",
      isActive: false,
    },
    {
      id: "5",
      name: "Billing",
      isActive: false,
    },
    {
      id: "6",
      name: "Logs",
      isActive: false,
    },
    {
      id: "7",
      name: "Zapier",
      isActive: false,
    },
    {
      id: "8",
      name: "Dashboard",
      isActive: false,
    },
  ]);
  useEffect(() => {
    const { flows, ...data } = selected;
    setUpdateUser({
      ...data,
      disabled: toggleIsActive === true ? false : true,
      is_admin: state,
      permissions: {
        ...data.permissions,
        flows: {
          type: "READ_AND_WRITE",
          access: item.map((item) => item.id),
        },
      },
    });
  }, [state, toggleIsActive, item, item?.length]);

  const handleColor = (value) => {
    value.isActive = true;
    const update = [...list];
    update.map((val, ind) => {
      if (val.id === value.id) {
        val.isActive = true;
      } else {
        val.isActive = false;
      }
    });
    setList(update);
  };
  const handleRemoveItems = (index) => {
    const temp = [...item];
    temp.splice(index, 1);
    setItem(temp);
  };
  const handleSelectOnChange = (e) => {
    const id = e.target.value;
    const name = allFlows.find((item) => item.id === id).name;
    item.includes(e.target.value) ? "" : item.push({ id, name });
    setUpdateUser((prev) => ({ ...prev, choose: e.target.value }));
  };

  return (
    <>
      <div>
        <div className="d-flex flex-row justify-content-between p-5 sec2">
          <div>
            {/* 
            <input
              type="file"
              accept="image/*"
              name="profile_picture"
              onChange={handleFileChange}
            /> */}
            <img
              src={userPic}
              alt={selected.heading}
              width="45rem"
              height="45rem"
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

      <div className="p-5 custom-container2">
        <table>
          <tr>
            <th className="w-25 font_style p-0">Name</th>
            <td className="  p-0">
              <CustomInput
                placeholder={"Enter Name"}
                inputStyle={"input-field"}
                onChange={(e) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    full_name: e.target.value,
                  }))
                }
                defaultValue={selected.full_name}
              />
            </td>
          </tr>
          <tr>
            <th className="font_style  p-0">Country</th>
            <td className="  p-0">
              <CustomInput
                placeholder={"Country code"}
                inputStyle={"input-field"}
                onChange={(e) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    phone_number: {
                      ...prev.phone_number,
                      country_code: e.target.value,
                    },
                  }))
                }
                defaultValue={selected.phone_number?.country_code}
              />
            </td>
          </tr>
          <tr>
            <th className="font_style  p-0">Phone</th>
            <td className="  p-0">
              <CustomInput
                placeholder={"Phone no"}
                inputStyle={"input-field"}
                numericOnly
                onChange={(e) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    phone_number: {
                      ...prev.phone_number,
                      number: e.target.value,
                    },
                  }))
                }
                defaultValue={selected.phone_number?.number}
              />
            </td>
          </tr>

          <tr>
            <th className="font_style  p-0">Email</th>
            <td className="  p-0">
              <CustomInput
                placeholder={"Enter Email"}
                inputStyle={"input-field"}
                onChange={(e) =>
                  setUpdateUser((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
                defaultValue={selected.email}
              />
            </td>
          </tr>
        </table>
        <div>
          <div className="button-bar">
            {list.map((value, index) => {
              return (
                <button
                  key={value.id}
                  className="bar-btn"
                  onClick={() => handleColor(value)}
                  style={{
                    backgroundColor: value.isActive ? "#212429" : "#ffffff",
                    color: value.isActive ? "#dde2e5 " : "black",
                  }}
                >
                  {value.name}
                </button>
              );
            })}
          </div>
          <CustomSelect
            title={"Select flows"}
            titleClass={"full-field-title-edit"}
            options={allFlows}
            isDict
            onChange={handleSelectOnChange}
            className={"select-menu-edit"}
            defaultValue={"Choose a value"}
          />
          <div className="item-btn-div">
            {item &&
              item?.length > 0 &&
              item?.map((val, index) => {
                return (
                  <button className="item-btn" key={index}>
                    <img
                      className="remove-icon"
                      src={RmvIcon}
                      alt="icon"
                      onClick={() => handleRemoveItems(index)}
                    />
                    {val?.name}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
      <div className="bottom-sec-edit">
        <div className="bottom-sec-div">
          <p className="bottom-heading">Account status</p>
          <div className="d-flex flex-row bottom-div1">
            <div>
              <label class="switch">
                <input
                  checked={toggleIsActive}
                  type="checkbox"
                  defaultValue={toggleIsActive}
                  onClick={() => setToggleIsActive(!toggleIsActive)}
                />
                <span class="slider round"></span>
              </label>
            </div>
            <div>
              <p className="bottom-role-title">Active</p>
              <p className="bottom-desc">Account is currently active for use</p>
              <div className="bottom-btn-div">
                <button
                  onClick={() => setToggleIsActive(true)}
                  style={{
                    background: toggleIsActive ? "" : "none",
                    backgroundColor: toggleIsActive ? "#338A17" : "none",
                    color: toggleIsActive ? "white" : "black",
                  }}
                  className="bottom-btn1"
                >
                  Active
                </button>
                <button
                  onClick={() => setToggleIsActive(false)}
                  style={{
                    background: toggleIsActive ? "none" : "",
                    backgroundColor: toggleIsActive ? "none" : "#338A17",
                    color: toggleIsActive ? "black" : "white",
                  }}
                  className="bottom-btn2"
                >
                  Deavtive
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-sec-div">
          <p className="bottom-heading">Admin Access</p>
          <div className="d-flex flex-row bottom-div1 ">
            <div>
              <label class="switch">
                <input
                  type="checkbox"
                  defaultValue={state}
                  onClick={() => setState(!state)}
                  checked={state}
                />
                <span class="slider round"></span>
              </label>
            </div>

            <div>
              <p className="bottom-role-title">Admin</p>
              <p className="bottom-desc">Account is currently an admin</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
