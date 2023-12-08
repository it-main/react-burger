import { checkResponse, sendRequest } from "../../utils/api";

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

const registerRequest = {
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
export const loginRequest = {
  type: LOGIN_REQUEST,
};
export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data.user,
  };
};
export const loginFailed = {
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
    sendRequest("password-reset", requestInit)
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
    sendRequest("password-reset/reset", requestInit)
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
    dispatch(registerRequest);
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    };
    sendRequest("auth/register", requestInit)
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
