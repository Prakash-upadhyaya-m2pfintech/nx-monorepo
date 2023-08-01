import axios from "axios";

import { redirect } from "react-router-dom";

// const ENV_URL = process.env.REACT_APP_BASE_URL;
// export const DOMAIN = ENV_URL;
// export const BASE_URL = "http://" + DOMAIN ;
export const BASE_URL = "https://stg-api.idflow.com/";
// export const BASE_URL = "https://b22a-202-59-90-27.ngrok-free.app/";

const ACCESS_TOKEN_KEY = "accessToken";
const EMAIL = "email";
const USERDATA = "userdata";

export const CLOUD_API_WEBHOOK = BASE_URL + "v2/messages/facebook/CloudAPI";
export const DIALOG_360_WEBHOOK = BASE_URL + "v2/messages/";

export function accessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function setEmail(email) {
  localStorage.setItem(EMAIL, email);
}
export function setUserData(user) {
  localStorage.setItem(USERDATA, JSON.stringify(user));
}
export function getUserData() {
  const userObject = localStorage.getItem(USERDATA);
  return JSON.parse(userObject);
}

export function getEmail() {
  return localStorage.getItem(EMAIL);
}
export function clearAccessToken(token) {
  localStorage.clear();
}

export function universalError(err) {
  const status_code = err.response.status;
  if (status_code === 401) {
    return redirect("/login");
  }
}

export const METHODS = {
  get: "get",
  post: "post",
  put: "put",
  delete: "delete",
};

export const request = async (method, v, path, body) => {
  try {
    const response = await axios({
      url: BASE_URL + v + path,
      method: method,
      headers: {
        Authorization: "Bearer " + accessToken(),
      },
      data: body,
    });

    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      return redirect("/login");
    }
  }
};

export const requestLogin = async (method, v, path, body) => {
  const response = await axios({
    url: BASE_URL + v + path,
    method: method,
    data: body,
  });

  return response.data;
};

export const commonRequest = async (method, path, body) => {
  return await request(method, "v1", path, body);
};

export const commonRequestV1 = (method, path, body, onSuccess, onFailure) => {
  return request(method, "v1", path, body, onSuccess, onFailure);
};

export const LoginRequestV1 = (method, path, body) => {
  return requestLogin(method, "v1", path, body);
};
