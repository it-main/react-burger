import {deleteCookie, setCookie} from "../utils/cookie";
import {accessToken, refreshToken} from "../utils/constants";
import {checkResponse, sendRequest} from "../utils/api";
import {loginFailed, loginRequest, loginSuccess} from "./actions/profile";

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
    dispatch(loginRequest);
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
      body: JSON.stringify({email, password}),
    };
    sendRequest("auth/login", requestInit)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch(loginSuccess(json));
          setCookie(accessToken, json.accessToken.split("Bearer ")[1]);
          setCookie(refreshToken, json.refreshToken);
        } else {
          dispatch(loginFailed);
          console.error("Ошибка при авторизации");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(loginFailed);
      });
  };
}