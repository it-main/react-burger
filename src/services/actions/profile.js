import {
  checkResponse,
  getUserRequest,
  loginRequest,
  registerRequest,
  signOutRequest,
  updateUserRequest,
} from "../../utils/api";
import { accessToken, refreshToken } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const SEND_REQUEST = "SEND_REQUEST";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
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

function setUserAction(data) {
  return {
    type: SET_USER,
    payload: data,
  };
}

function setCookies(json) {
  setCookie(accessToken, json.accessToken);
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
          dispatch(setUserAction(json.user));
        } else {
          dispatch(requestFailedAction);
          console.error("Произошла ошибка при регистрации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestFailedAction);
      });
  };
}

export function sendRequestUpdateUser(data) {
  return (dispatch) => {
    dispatch(sendRequestAction);
    updateUserRequest(data)
      .then((json) => {
        if (json.success) {
          dispatch(setUserAction(json.user));
        } else {
          dispatch(requestFailedAction);
          console.error(
            "Произошла ошибка при обновлении информации о пользователе",
          );
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
      .then((json) => {
        if (json.success) {
          dispatch(setUserAction(json.user));
        } else {
          dispatch(requestFailedAction);
          console.error("Ошибка при запросе информации о пользователе");
        }
      })
      .catch((err) => {
        dispatch(requestFailedAction);
        return Promise.reject(err);
      });
  };
}

export function checkUserAuth() {
  return (dispatch) => {
    if (getCookie(accessToken)) {
      dispatch(getUser())
        .catch((err) => {
          console.log("Ошибка при получении нового accessToken:", err);
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
          dispatch(setUserAction(json.user));
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
