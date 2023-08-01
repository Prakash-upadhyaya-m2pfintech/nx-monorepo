import { LoginRequestV1, commonRequestV1 } from "./common";
const path = (user) => "/users/" + user;

export const getUser = () => {
  return commonRequestV1("get", path("me"));
};

export const login = (user) => {
  return LoginRequestV1("post", path("login"), user);
};
export const sendEmail = (email) => {
  return LoginRequestV1("post", path(email));
};

export const createUser = (user, onSuccess) => {
  return commonRequestV1("post", path(""), user, onSuccess);
};

export const updateUser = (id, body) => {
  return commonRequestV1("put", path(id), body);
};

export const deleteUser = (user, onSuccess) => {
  return commonRequestV1("delete", path(user), {}, onSuccess);
};

export const sendResetEmail = (email) => {
  return commonRequestV1("post", path(`${email}/request_reset`));
};

export const verifyOTP = (user) => {
  return commonRequestV1("post", path("verify"), user);
};

export const resetPassword = (user) => {
  return commonRequestV1("post", path("reset"), user);
};

export const getAllUsers = () => {
  return commonRequestV1("get", path("?limit=1000"));
};

export const getUserByID = (id) => {
  return commonRequestV1("get", path(id));
};
export const checkUserRegister = (body) => {
  return commonRequestV1("post", path("verify/token"), body);
};
