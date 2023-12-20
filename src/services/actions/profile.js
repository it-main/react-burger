import {
  checkResponse,
  getUserRequest,
  loginRequest,
  registerRequest,
  signOutRequest,
} from "../../utils/api";
import { accessToken, refreshToken } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const SEND_REQUEST = "SEND_REQUEST";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const LOGOUT = "LOGOUT";

const sendRequestAction = {
  type: SEND_REQUEST,
};

const requestFailedAction = {
  type: REQUEST_FAILED,
};

const logoutAction = {
  type: LOGOUT,
};

const setAuthCheckedAction = {
  type: SET_AUTH_CHECKED,
};

const registerSuccessAction = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data.user,
  };
};

const loginSuccessAction = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data.user,
  };
};

function setUserAction(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

function setCookies(json) {
  setCookie(accessToken, json.accessToken.split("Bearer ")[1]);
  setCookie(refreshToken, json.refreshToken);
}

function deleteCookies() {
  deleteCookie(accessToken);
  deleteCookie(refreshToken);
}

export function sendRequestRegister(name, email, password) {
  return function (dispatch) {
    dispatch(sendRequestAction);
    registerRequest(name, email, password)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          setCookies(json);
          dispatch(registerSuccessAction(json));
        } else {
          dispatch(requestFailedAction);
          console.error("Ошибка при регистрации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestFailedAction);
      });
  };
}

export function getUser() {
  return (dispatch) => {
    dispatch(sendRequestAction);
    return getUserRequest()
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(setUserAction(json.user));
          console.error("Ошибка при запросе информации о пользователе");
        } else {
          dispatch(requestFailedAction);
        }
      });
  };
}
export function checkUserAuth() {
  return (dispatch) => {
    if (getCookie(accessToken)) {
      dispatch(getUser())
        .catch(() => {
          deleteCookies();
          dispatch(logoutAction);
        })
        .finally(() => {
          dispatch(setAuthCheckedAction);
        });
    } else {
      dispatch(setAuthCheckedAction);
    }
  };
}

export function signOut() {
  return function (dispatch) {
    dispatch(sendRequestAction);
    signOutRequest().finally(() => {
      deleteCookies();
      dispatch(logoutAction);
    });
  };
}

export function signIn(email, password) {
  return function (dispatch) {
    dispatch(sendRequestAction);
    loginRequest(email, password)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(loginSuccessAction(json));
          setCookies(json);
        } else {
          dispatch(requestFailedAction);
          console.error("Ошибка при авторизации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestFailedAction);
      });
  };
}
