import { accessToken, endpoints, refreshToken } from "./constants";
import { getCookie, setCookie } from "./cookie";

export function checkResponse(response) {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error.message));
}

export function sendRequest(endpoint, requestInit) {
  return fetch(`${endpoints.api}/${endpoint}`, requestInit);
}

export function loginRequest(email, password) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  };
  return sendRequest(endpoints.login, requestInit);
}

export function registerRequest(name, email, password) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  };
  return sendRequest(endpoints.register, requestInit);
}

export function forgotPasswordRequest(email) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  };
  return sendRequest(endpoints.resetPassword, requestInit);
}

export function resetPasswordRequest(password, token) {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password, token }),
  };
  return sendRequest(endpoints.reset, requestInit);
}

export function signOutRequest() {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.logout, requestInit);
}

export function getUserRequest() {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie(accessToken),
    },
  };
  return sendRequestWithRefresh(endpoints.user, requestInit);
}

export function updateUserRequest({ email, password, name }) {
  const requestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie(accessToken),
    },
    body: JSON.stringify({ email, password, name }),
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

export async function sendRequestWithRefresh(url, requestInit) {
  try {
    const response = await sendRequest(url, requestInit);
    return await checkResponse(response);
  } catch (err) {
    if (err !== "jwt expired") {
      return Promise.reject(err);
    }
    const refreshData = await refreshTokenRequest().then(checkResponse);
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    setCookie(accessToken, refreshData.accessToken);
    setCookie(refreshToken, refreshData.refreshToken);
    requestInit.headers.authorization = refreshData.accessToken;
    return sendRequest(url, requestInit).then(checkResponse);
  }
}
