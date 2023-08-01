import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchSortFilter from "../SearchFilterSort";
import {
  getAllUsers,
  getUserByID,
  updateUser as updateUserData,
} from "../../api/users";

import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllUserDetails from "../AllUserDetails";
import CustomButton from "../core/Button";
import { getAllWorkFlow } from "../../api/workflow";

const UsersScreen = () => {
  const navigate = useNavigate();
  const [switchModal, setSwitchModal] = useState(false);
  const [addNewUser, setAddNewUser] = useState(false);
  const [selected, setSelected] = useState({});
  const [state, setState] = useState([]);
  const [allFlows, setAllFlows] = useState([]);

  const [updateUser, setUpdateUser] = useState({
    organization: selected?.organization,
    organization_name: selected?.organization_name,
    phone_number: {
      country_code: selected?.phone_number?.country_code,
      number: selected?.phone_number?.number,
    },
    flows: [],
    email: selected?.email,
    full_name: selected?.full_name,
    image: selected?.image,
    service: selected?.service,
    disabled: selected?.disabled,
    is_admin: selected?.is_admin,
    otp: 0,
    permissions: {},
  });
  const showErrorMessage = (err) => {
    toast.error(err ? err : "Some thing went wrong", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showSuccessMessage = (msg) => {
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const filterFlowsByPermissions = (user, flows) => {
    let permittedFlowIds = [];
    if (
      user.permissions &&
      user.permissions.flows &&
      user.permissions.flows.access
    ) {
      user.permissions.flows.access.forEach((flowId) => {
        permittedFlowIds.push(flowId);
      });
    }
    let filteredFlows = flows.filter((flow) =>
      permittedFlowIds.includes(flow.id)
    );
    return filteredFlows;
  };

  const handleGetUser = (id) => {
    getUserByID(id)
      .then((res) => {
        if (res) {
          if (allFlows && allFlows.length === 0) {
            getAllWorkFlow("name").then((workflowRes) => {
              if (workflowRes) {
                const workflowResp = workflowRes.map((item) => {
                  const { _id, ...rest } = item;
                  return { id: _id, ...rest };
                });
                setAllFlows(workflowResp);
                const targetObject = filterFlowsByPermissions(
                  res,
                  workflowResp
                );
                const { ...updatedRespUser } = res;
                const selectedAccount = {
                  ...updatedRespUser,
                  flows: targetObject,
                };
                setSelected(selectedAccount);
                setSwitchModal(false);
              }
            });
          } else {
            const targetObject = filterFlowsByPermissions(res, allFlows);
            const { ...updatedRespUser } = res;
            const selectedAccount = { ...updatedRespUser, flows: targetObject };
            setSelected(selectedAccount);
            setSwitchModal(false);
          }
        } else {
          showErrorMessage();
        }
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  };
  const getAllUsersData = (update) => {
    getAllUsers()
      .then((res) => {
        if (res && res.length > 0) {
          if (update) {
            setState(res);
          } else {
            setState(res);
            handleGetUser(res[0].id);
          }
        }
      })
      .catch((err) => {
      });
  };
  useEffect(() => {
    getAllUsersData();
    getAllWorkFlow("name,organization").then((workflowRes) => {
      if (workflowRes) {
        const workflowResp = workflowRes.map((item) => {
          const { _id, ...rest } = item;
          return { id: _id, ...rest };
        });
        setAllFlows(workflowResp);
      }
    });
  }, []);

  const switchScreen = () => {
    setSwitchModal(!switchModal);
  };
  const handleUpdate = () => {
    updateUserData(selected.id, updateUser)
      .then((res) => {
        if (res) {
          setSelected(res);
          getAllUsersData("update");
          setSwitchModal(false);
        } else {
          showErrorMessage();
        }
      })
      .catch((err) => {
        showErrorMessage(err);
      });
  };

  return (
    <div className="builder-main">
      <ToastContainer />

      <div className="builder-heading">
        <div className="builder-main-heading">
          <p className="users-title">Users</p>

          <p className="users-title-desc">
            Lorem ipsum dolor sit amet consectetur. Tortor varius aliquam sapien
            scelerisque ac.
          </p>
        </div>
        {!addNewUser && (
          <CustomButton
            title={"Add new contact"}
            className={"builder-heading-btn"}
            handleFunction={() => setAddNewUser(true)}
          />
        )}
      </div>
      <SearchSortFilter />
      <AllUserDetails
        handleGetUser={handleGetUser}
        selected={selected}
        state={state}
        switchModal={switchModal}
        switchScreen={switchScreen}
        handleUpdate={handleUpdate}
        setUpdateUser={setUpdateUser}
        showErrorMessage={showErrorMessage}
        showSuccessMessage={showSuccessMessage}
        setAddNewUser={setAddNewUser}
        addNewUser={addNewUser}
        setSelected={setSelected}
        getAllUsersData={getAllUsersData}
        allFlows={allFlows}
      />
    </div>
  );
};

export default UsersScreen;
