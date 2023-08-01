import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditIcon from "../../assets/userScreenSvg/edit-icon.svg";
import MySvg from "../../assets/userScreenSvg/save-icon.svg";
import EditUser from "./editUser";
import UserDetail from "./userDetail";
import "./index.css";
import CustomButton from "../core/Button";
import AddNewUser from "./addNewUser";
import BackArrowIcon from "../../assets/userScreenSvg/back-arrow.svg";

export default function AllUserDetails({
  state,
  selected,
  handleGetUser,
  switchScreen,
  switchModal,
  handleUpdate,
  setUpdateUser,
  showSuccessMessage,
  showErrorMessage,
  addNewUser,
  setAddNewUser,
  setSelected,
  getAllUsersData,
  allFlows,
}) {
  return (
    <Container fluid className="mt-5">
      <Row className="p-0">
        <Col lg="4" className="scroll-sec">
          {state &&
            state?.map((value, index) => (
              <Container
                fluid
                className="p-0 custom_hover d-flex flex-wrap ps-0 gx-10 "
                style={{
                  boxShadow:
                    selected.id === value.id
                      ? "0 18px 28px rgba(9, 30, 66, 0.05)"
                      : "",
                }}
                onClick={() => handleGetUser(value.id)}
                key={value.id}
              >
                <Col
                  lg="3"
                  xxl="2"
                  className="col1 pt-3 pb-3 ps-2 img-fluid"
                  style={{
                    borderBottom: "1px solid #DDE2E5",
                    backgroundColor: selected.id === value.id ? "white" : "",
                    borderTop:
                      selected.id === value.id ? "1.5px solid #DDE2E5" : "",
                    borderLeft:
                      selected.id === value.id ? "1.5px solid #DDE2E5" : "",
                  }}
                >
                  <img
                    src={value.image}
                    alt={"icon"}
                    height="45rem"
                    width="45rem"
                    className="rounded-img"
                  />
                </Col>
                <Col
                  lg="5"
                  xxl="6"
                  className="col2 p-0 m-0 pt-3 pb-3"
                  style={{
                    borderBottom: "1px solid #DDE2E5",
                    backgroundColor: selected.id === value.id ? "white" : "",
                    borderTop:
                      selected.id === value.id ? "1.5px solid #DDE2E5" : "",
                  }}
                >
                  <p className="p-0 m-0 ml-4 spanText">{value.full_name}</p>
                  <p
                    className="p-0 m-0 ml-4 font_style"
                    style={{ fontSize: "15px", fontWeight: "400" }}
                  >
                    {value?.phone_number?.country_code}{' '}
                    {value?.phone_number?.number}
                  </p>
                </Col>
                <Col
                  lg="4"
                  className="col2 p-0 m-0 pt-3 pb-3"
                  style={{
                    borderBottom: "1px solid #DDE2E5",
                    backgroundColor: selected.id === value.id ? "white" : "",
                    borderTop:
                      selected.id === value.id ? "1.5px solid #DDE2E5" : "",
                    borderRight:
                      selected.id === value.id ? "1.5px solid #DDE2E5" : "",
                  }}
                >
                  <div
                    className="custom-styles "
                    style={{
                      backgroundColor: selected.id === value.id ? "white" : "",
                      border:
                        value.is_admin === true
                          ? "1px solid #DDE2E5"
                          : value.is_admin === false
                          ? "1px solid #DDE2E5"
                          : "",
                    }}
                  >
                    {value.is_admin ? (
                      "Admin"
                    ) : value.is_admin === false ? (
                      "User"
                    ) : (
                      <></>
                    )}
                  </div>
                </Col>
              </Container>
            ))}
        </Col>
        {selected && (
          <Col lg="8" className="p-0 border-6">
            <div className="custom-container">
              <div className="d-flex  main-div p-3 ">
                {addNewUser ? (
                  <div>
                    <div className="d-flex align-items-center ">
                      <div>
                        <img
                          src={BackArrowIcon}
                          alt="back arrow"
                          className="m-0 cursor-pointer"
                          onClick={() => setAddNewUser(false)}
                        />
                      </div>
                      <p className="textSize ps-2">Create Users</p>
                    </div>
                  </div>
                ) : (
                  <p className="textSize">
                    {switchModal ? "Edit details" : "User Details"}
                  </p>
                )}
                {addNewUser ? (
                  <div></div>
                ) : (
                  <>
                    {switchModal ? (
                      <CustomButton
                        title={"Save"}
                        className={"custom_button"}
                        handleFunction={handleUpdate}
                        isIcon={MySvg}
                      />
                    ) : (
                      <CustomButton
                        title={"Edit"}
                        className={"custom_button"}
                        handleFunction={switchScreen}
                        isIcon={EditIcon}
                      />
                    )}
                  </>
                )}
              </div>
              {switchModal ? (
                <EditUser
                  setSwitchModal={switchScreen}
                  selected={selected}
                  setUpdateUser={setUpdateUser}
                  allFlows={allFlows}
                />
              ) : addNewUser ? (
                <AddNewUser
                  setSwitchModal={switchScreen}
                  selected={selected}
                  addNewUser={addNewUser}
                  setAddNewUser={setAddNewUser}
                  setSelected={setSelected}
                  getAllUsersData={getAllUsersData}
                  showSuccessMessage={showSuccessMessage}
                  showErrorMessage={showErrorMessage}
                  allFlows={allFlows}
                />
              ) : (
                <UserDetail
                  selected={selected}
                  showErrorMessage={showErrorMessage}
                  showSuccessMessage={showSuccessMessage}
                />
              )}
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}
