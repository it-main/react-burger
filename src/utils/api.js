import { URL_API } from "./constants";
import {
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../services/actions/profile";
export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const sendRequest = (endpoint, requestInit) => {
  return fetch(`${URL_API}/${endpoint}`, requestInit);
};

export function sendRequestResetPassword(email) {
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
