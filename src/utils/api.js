import { endpoints } from "./constants";

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const sendRequest = (endpoint, requestInit) => {
  return fetch(`${endpoints.api}/${endpoint}`, requestInit);
};
