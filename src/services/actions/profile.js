import { checkResponse, registerRequest, sendRequest } from "../../utils/api";
import { accessToken, endpoints } from "../../utils/constants";
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

export const LOGOUT = "LOGOUT";

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
export const loginRequestAction = {
  type: LOGIN_REQUEST,
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

export function checkUserAuth() {
  return (dispatch) => {
    // if (localStorage.getItem("accessToken")) {
    if (getCookie(accessToken)) {
      dispatch(getUser());
      //   .catch(() => {
      //     localStorage.removeItem("accessToken");
      //     localStorage.removeItem("refreshToken");
      //     dispatch(setUser(null));
      //   })
      //   .finally(() => dispatch(setAuthChecked(true)));
    } else {
      // dispatch(setAuthChecked(true));
    }
  };
}
