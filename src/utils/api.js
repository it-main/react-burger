import { URL_API } from "./constants";

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const sendRequest = (endpoint, requestInit) => {
  return fetch(`${URL_API}/${endpoint}`, requestInit);
};

