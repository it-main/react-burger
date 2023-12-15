import {
  checkResponse,
  getUserRequest,
  loginRequest,
  registerRequest,
  sendRequest,
} from "../../utils/api";
import { accessToken, endpoints, refreshToken } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const FORM_SET_VALUE = "FORM_SET_VALUE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SEND_REQUEST = "SEND_REQUEST";

export const LOGOUT = "LOGOUT";

export const sendRequestAction = {
  type: SEND_REQUEST,
};

export const logoutAction = {
  type: LOGOUT,
};

//TODO////////////////////////////////////////////

export const setAuthChecked = {
  type: SET_AUTH_CHECKED,
};

const resetPasswordSuccess = (message) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};

const resetPasswordFailed = {
  type: RESET_PASSWORD_FAILED,
  payload: false,
};

const resetPasswordRequest = {
  type: RESET_PASSWORD_REQUEST,
};

const register = {
  type: REGISTER_REQUEST,
};
const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data.user,
  };
};

const registerFailed = {
  type: REGISTER_FAILED,
  payload: undefined,
};

export const loginSuccessAction = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data.user,
  };
};
export const loginFailedAction = {
  type: LOGIN_FAILED,
  payload: undefined,
};
export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function sendRequestForgotPassword(email) {
  return function (dispatch) {
    dispatch(resetPasswordRequest);
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };
    sendRequest(endpoints.forgotPassword, requestInit)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(resetPasswordSuccess(json.message));
        } else {
          dispatch(resetPasswordFailed);
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(resetPasswordFailed);
      });
  };
}

export function sendRequestResetPassword(password, token) {
  return function (dispatch) {
    dispatch(resetPasswordRequest);
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token }),
    };
    sendRequest(endpoints.resetPassword, requestInit)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(resetPasswordSuccess(json.message));
        } else {
          dispatch(resetPasswordFailed);
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(resetPasswordFailed);
      });
  };
}

export function sendRequestRegister(name, email, password) {
  return function (dispatch) {
    dispatch(register);
    registerRequest(name, email, password)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(registerSuccess(json));
        } else {
          dispatch(registerFailed);
          console.error("Ошибка при регистрации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(registerFailed);
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
          console.log(json.user);
          dispatch(setUser(json.user));
        }
      });
  };
}
export function checkUserAuth() {
  return (dispatch) => {
    if (getCookie(accessToken)) {
      dispatch(getUser())
        .catch(() => {
          deleteCookie(accessToken);
          deleteCookie(refreshToken);
          dispatch(logoutAction);
        })
        .finally(() => {
          dispatch(setAuthChecked);
        });
    } else {
      dispatch(setAuthChecked);
    }
  };
}

export function signOut() {
  return (dispatch) => {
    // dispatch(logout);
    deleteCookie(accessToken);
    deleteCookie(refreshToken);

    // https://norma.nomoreparties.space/api/auth/logout
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
          setCookie(accessToken, json.accessToken.split("Bearer ")[1]);
          setCookie(refreshToken, json.refreshToken);
        } else {
          dispatch(loginFailedAction);
          console.error("Ошибка при авторизации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(loginFailedAction);
      });
  };
}
