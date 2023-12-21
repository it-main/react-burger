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

// export function fetchWithRefresh (url, requestInit) {
//   const res = sendRequest(url, requestInit)
//     .then(checkResponse)
//     .then(json) {return await checkReponse(res)}
//   } catch (err) {
//     if (err.message === "jwt expired") {
//       const refreshData = await refreshTokenRequest(); //обновляем токен
//       if (!refreshData.success) {
//         return Promise.reject(refreshData);
//       }
//       localStorage.setItem("refreshToken", refreshData.refreshToken);
//       localStorage.setItem("accessToken", refreshData.accessToken);
//       requestInit.headers.authorization = refreshData.accessToken;
//       const res = await fetch(url, requestInit); //повторяем запрос
//       return await checkReponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

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
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.logout, requestInit);
}
