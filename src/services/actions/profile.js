import {
  checkResponse,
  forgotPasswordRequest,
  getUserRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
} from "../../utils/api";
import { accessToken, refreshToken } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const SEND_REQUEST = "SEND_REQUEST";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const FORM_SET_VALUE = "FORM_SET_VALUE";
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

const resetPasswordSuccessAction = {
  type: RESET_PASSWORD_SUCCESS,
};

export function forgotPassword(email) {
  return function (dispatch) {
    dispatch(sendRequestAction);
    forgotPasswordRequest(email)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(resetPasswordSuccessAction);
        } else {
          dispatch(requestFailedAction);
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestFailedAction);
      });
  };
}

export function resetPassword(password, token) {
  return function (dispatch) {
    dispatch(sendRequestAction);
    resetPasswordRequest(password, token)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(resetPasswordSuccessAction);
        } else {
          dispatch(requestFailedAction);
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(requestFailedAction);
      });
  };
}

export function sendRequestRegister(name, email, password) {
  return function (dispatch) {
    dispatch(sendRequestAction);
    registerRequest(name, email, password)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
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
          deleteCookie(accessToken);
          deleteCookie(refreshToken);
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
