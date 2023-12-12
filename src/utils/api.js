import { endpoints } from "./constants";

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

export function getUser() {}
