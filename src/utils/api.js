import { accessToken, endpoints, refreshToken } from "./constants";
import { getCookie, setCookie } from "./cookie";

export function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
}

const checkReponse1 = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function sendRequest(endpoint, requestInit) {
  return fetch(`${endpoints.api}/${endpoint}`, requestInit);
}

function getAuthorizedToken() {
  return "Bearer " + getCookie(accessToken);
}

export function loginRequest(email, password) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  return sendRequest(endpoints.login, requestInit);
}

export function registerRequest(name, email, password) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  };
  return sendRequest(endpoints.register, requestInit);
}

export function forgotPasswordRequest(email) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  };
  return sendRequest(endpoints.resetPassword, requestInit);
}

export function resetPasswordRequest(password, token) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, token }),
  };
  return sendRequest(endpoints.reset, requestInit);
}

export function signOutRequest() {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.logout, requestInit);
}

export function getUserRequest() {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: getAuthorizedToken(),
    },
  };
  return sendRequestWithRefresh(endpoints.user, requestInit);
}

export function refreshTokenRequest() {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.token, requestInit);
}

export function sendRequestWithRefresh1(url, requestInit) {
  sendRequest(url, requestInit)
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res.json());
      } else {
        Promise.reject(res.status);
      }
    })
    .catch((err) => {
      console.log("catch sendRequestWithRefresh: ", err.message);
      if (err.message === "jwt expired") {
        refreshTokenRequest()
          .then(checkResponse)
          .then((refreshData) => {
            if (!refreshData.success) {
              return Promise.reject(refreshData);
            }
            setCookie(accessToken, refreshData.accessToken);
            setCookie(refreshToken, refreshData.refreshToken);
            requestInit.headers.authorization = refreshData.accessToken;
            sendRequest(url, requestInit).then((res) => {
              return checkResponse(res);
            });
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.reject(err);
      }
    });
}
