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
import { AppDispatch } from "../types";

export const SEND_REQUEST = "SEND_REQUEST";
export const REQUEST_FAILED = "REQUEST_FAILED";
export const SET_USER = "SET_USER";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const LOGOUT = "LOGOUT";

type TSendRequestAction = {
  readonly type: typeof SEND_REQUEST;
};

type TRequestFiledAction = {
  readonly type: typeof REQUEST_FAILED;
};

type TLogoutAction = {
  readonly type: typeof LOGOUT;
};

type TSetAuthCheckedAction = {
  readonly type: typeof SET_AUTH_CHECKED;
};

type TSetUserAction = {
  readonly type: typeof SET_USER;
  readonly payload: TUser;
};

const sendRequestAction: TSendRequestAction = {
  type: SEND_REQUEST,
};

const requestFailedAction: TRequestFiledAction = {
  type: REQUEST_FAILED,
};

const logoutAction: TLogoutAction = {
  type: LOGOUT,
};

const setAuthCheckedAction: TSetAuthCheckedAction = {
  type: SET_AUTH_CHECKED,
};

function setUserAction(data: TUser): TSetUserAction {
  return {
    type: SET_USER,
    payload: data,
  };
}

export type TProfileActions =
  | TSendRequestAction
  | TRequestFiledAction
  | TLogoutAction
  | TSetAuthCheckedAction
  | TSetUserAction;

function setCookies(json: { accessToken: string; refreshToken: string }) {
  setCookie(accessToken, json.accessToken);
  setCookie(refreshToken, json.refreshToken);
}

function deleteCookies() {
  deleteCookie(accessToken);
  deleteCookie(refreshToken);
}

export function sendRequestRegister({ name, email, password }: TUser) {
  return function (dispatch: AppDispatch) {
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

export function sendRequestUpdateUser(data: TUser) {
  return (dispatch: AppDispatch) => {
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

// export function getUser() {
//   return (dispatch: AppDispatch) => {
//     dispatch(sendRequestAction);
//     return getUserRequest()
//       .then((json) => {
//         if (json.success) {
//           dispatch(setUserAction(json.user));
//         } else {
//           dispatch(requestFailedAction);
//           console.error("Ошибка при запросе информации о пользователе");
//         }
//       })
//       .catch((err) => {
//         dispatch(requestFailedAction);
//         return Promise.reject(err);
//       });
//   };
// }

export function checkUserAuth() {
  return (dispatch: AppDispatch) => {
    if (getCookie(accessToken)) {
      // dispatch(getUser())
      getUserRequest()
        .then((json) => {
          if (json.success) {
            dispatch(setUserAction(json.user));
          } else {
            dispatch(requestFailedAction);
            console.error("Ошибка при запросе информации о пользователе");
          }
        })
        .catch((err) => {
          console.log("Ошибка при получении нового accessToken:", err);
          dispatch(requestFailedAction);
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
  return function (dispatch: AppDispatch) {
    dispatch(sendRequestAction);
    signOutRequest().finally(() => {
      deleteCookies();
      dispatch(logoutAction);
    });
  };
}

export function signIn(email: string, password: string) {
  return function (dispatch: AppDispatch) {
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
