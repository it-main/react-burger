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
  return sendRequest(endpoints.login, requestInit);
}
