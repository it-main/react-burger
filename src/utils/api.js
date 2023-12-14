import { accessToken, endpoints } from "./constants";
import { getCookie } from "./cookie";

export function checkResponse(response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
}

export function sendRequest(endpoint, requestInit) {
  return fetch(`${endpoints.api}/${endpoint}`, requestInit);
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
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    authorization: getCookie(accessToken),
  };
  return sendRequest(endpoints.user, requestInit);
}
