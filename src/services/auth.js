import { deleteCookie, setCookie } from "../utils/cookie";
import { accessToken, refreshToken } from "../utils/constants";
import {
  checkResponse,
  getUserRequest,
  loginRequest,
  sendRequest,
} from "../utils/api";
import {
  loginFailedAction,
  loginRequestAction,
  loginSuccessAction,
  requestSent,
} from "./actions/profile";

export function getUser() {
  return function (dispatch) {
    dispatch(requestSent);
    getUserRequest()
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(setUser(json.user));
        }
      });
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
    dispatch(loginRequestAction);
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
