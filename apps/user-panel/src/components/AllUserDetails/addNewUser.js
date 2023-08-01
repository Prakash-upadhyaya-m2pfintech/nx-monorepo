import React, { useEffect,useState } from "react";
import "./index.css";
import CustomSelect from "../core/CustomSelect";
import CustomInput from "../core/InputField";
import CustomButton from "../core/Button";
import RmvIcon from "../../assets/userScreenSvg/remove-icon.svg";
import { createUser } from "../../api/users";

const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {};
};

export default function AddNewNumber({
  setAddNewUser,
  setSelected,
  getAllUsersData,
  showSuccessMessage,
  showErrorMessage,
  allFlows,
}) {
  const [newAccount, setNewAccount] = useState({
    organization: 1,
    organization_name: "",
    phone_number: {
      country_code: 92,
      number: 0,
    },
    email: "",
    full_name: "",
    image: "",
    service: "",
    disabled: false,
    is_admin: false,
    otp: 0,
    permissions: {},
  });

  const [toggleIsActive, setToggleIsActive] = useState(false);
  const [state, setState] = useState(false);

  const handleChangeIcon = (event) => {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      getBase64(image, (res) => {
        setNewAccount((prev) => ({ ...prev, image: res }));
      });
    }
  };

  const countryCodeOptions = [91, 92];
  const [item, setItem] = useState([]);

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
  const optionsList = [
    "Choose a value",
    "instagram",
    "snapchat",
    "Facebook",
    "Whatsapp",
    "other",
  ];

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
    setNewAccount((prev) => ({ ...prev, choose: e.target.value }));
  };

  useEffect(() => {
    setNewAccount({
      ...newAccount,
      disabled: toggleIsActive === true ? false : true,
      is_admin: state,
      permissions: {
        ...newAccount.permissions,
        flows: {
          ...newAccount.permissions.flows,
          type: "READ_AND_WRITE",
          access: item.map((item) => item.id),
        },
      },
    });
  }, [state, toggleIsActive, item]);

  const handleNewAccounts = () => {
    createUser(newAccount)
      .then((res) => {
        if (res) {
          showSuccessMessage("Contact has been added");
          setAddNewUser(false);
          setSelected(res);
          getAllUsersData("update");
        } else {
          showErrorMessage("Unable to add contact");
        }
      })
      .catch((err) => {
        showErrorMessage("Unable to add contact");
        console.log({ err });
      });
  };
  return (
    <>
      <div className="p-4 custom-container2">
        <div className="d-flex flex-column w-100">
          <div className="d-flex flex-row justify-content-between w-100 ">
            <div className="d-flex flex-column w-100">
              <CustomInput
                label={"Name"}
                labelClass={"mb-2 full-field-title-name"}
                placeholder={"Enter Name"}
                inputStyle={"input-custom-add h-5"}
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    full_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="d-flex flex-column w-100">
              <div className="full-field-title-edit mb-2">Phone Number</div>
              <div className="">
                <div className="select-input-div">
                  <CustomSelect
                    className="half-select-phone"
                    options={countryCodeOptions}
                    onChange={(e) =>
                      setNewAccount((prev) => ({
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
                        setNewAccount((prev) => ({
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
              </div>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-between w-100 mt-4">
            <div className="d-flex flex-column w-100">
              <CustomInput
                label={"Email"}
                labelClass={"mb-2 full-field-title-edit"}
                placeholder={"Abc@gmail.com"}
                inputStyle={"input-custom-add h-5"}
                onChange={(e) =>
                  setNewAccount((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </div>

            <div className="d-flex flex-column w-100">
              <CustomInput
                type="file"
                id="file"
                label={"Upload Profile"}
                labelClass={"mb-2 full-field-title-edit"}
                placeholder={"Choose A Picture"}
                onChange={handleChangeIcon}
                uploadLabel="Upload Profile"
              />
            </div>
          </div>
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
                item.length > 0 &&
                item.map((val, index) => {
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
          <div className="bottom-sec">
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
                  <p className="bottom-desc">
                    Account is currently active for use
                  </p>
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
          <div>
            <CustomButton
              title={"Save details"}
              className={"builder-heading-btn-Save-details"}
              handleFunction={handleNewAccounts}
            />
          </div>
        </div>
      </div>
    </>
  );
}
