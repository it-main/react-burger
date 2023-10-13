import { checkResponse, sendRequest } from "../../utils/api";
import { setCookie } from "../../utils/cookie";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_INIT = "RESET_PASSWORD_INIT";
export const FORM_SET_VALUE = "FORM_SET_VALUE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const LOGOUT = "LOGOUT";

function setFormValue(field, value) {
  return { type: FORM_SET_VALUE, payload: { field, value } };
}

export const onFormChange = (event, dispatch) => {
  dispatch(setFormValue(event.target.id, event.target.value));
};

export function sendRequestForgotPassword(email) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
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
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: json.success,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: false,
          });
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: false,
        });
      });
  };
}

export function sendRequestResetPassword(password, token) {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
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
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: json.success,
          });
        } else {
          dispatch({
            type: RESET_PASSWORD_FAILED,
            payload: false,
          });
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: RESET_PASSWORD_FAILED,
          payload: false,
        });
      });
  };
}

export function sendRequestRegister(name, email, password) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
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
          dispatch({
            type: REGISTER_SUCCESS,
            payload: { ...json.user },
          });
        } else {
          dispatch({
            type: REGISTER_FAILED,
            payload: undefined,
          });
          console.error("Ошибка при регистрации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: REGISTER_FAILED,
          payload: undefined,
        });
      });
  };
}

export function sendRequestLogin(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const requestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    sendRequest("auth/login", requestInit)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: { ...json.user },
          });
          setCookie("accessToken", json.accessToken.split("Bearer ")[1]);
          setCookie("refreshToken", json.refreshToken);
        } else {
          dispatch({
            type: LOGIN_FAILED,
            payload: undefined,
          });
          console.error("Ошибка при авторизации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: LOGIN_FAILED,
          payload: undefined,
        });
      });
  };
}
