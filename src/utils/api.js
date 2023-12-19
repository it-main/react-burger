import { accessToken, endpoints, refreshToken } from "./constants";
import { getCookie } from "./cookie";

export function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
}

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

export function getUserRequest() {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: getAuthorizedToken(),
    },
  };
  return sendRequest(endpoints.user, requestInit);
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
    body: getCookie(refreshToken),
  };
  return sendRequest(endpoints.logout, requestInit);
}
