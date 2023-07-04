const URL = "https://norma.nomoreparties.space/api";
export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка: ${response.status}`);
};

export const sendRequest = (endpoint, requestInit) => {
  return fetch(`${URL}/${endpoint}`, requestInit);
}
