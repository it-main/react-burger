import { accessToken, endpoints, refreshToken } from "./constants";
import { getCookie, setCookie } from "./cookie";
import {
  TResponse,
  TTokenResponse,
  TUserResponse,
} from "../services/types/api";

export function checkResponse<T>(response: Response): Promise<T> {
  return response.ok
    ? response.json()
    : response.json().then((error) => Promise.reject(error.message));
}

export function sendRequest(
  endpoint: string,
  options?: RequestInit,
): Promise<Response> {
  return fetch(`${endpoints.api}/${endpoint}`, options);
}

export function loginRequest(
  email: string,
  password: string,
): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password }),
  };
  return sendRequest(endpoints.login, requestInit);
}

export function registerRequest(
  name: string,
  email: string,
  password: string,
): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email, password, name }),
  };
  return sendRequest(endpoints.register, requestInit);
}

export function forgotPasswordRequest(email: string): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ email }),
  };
  return sendRequest(endpoints.resetPassword, requestInit);
}

export function resetPasswordRequest(
  password: string,
  token: string,
): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ password, token }),
  };
  return sendRequest(endpoints.reset, requestInit);
}

export function signOutRequest(): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.logout, requestInit);
}

export function getUserRequest(): Promise<TResponse<TUserResponse>> {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie(accessToken),
    },
  };
  return sendRequestWithRefresh(endpoints.user, requestInit);
}

export function updateUserRequest({
  email,
  password,
  name,
}: TUser): Promise<TResponse<TUserResponse>> {
  const requestInit: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie(accessToken),
    },
    body: JSON.stringify({ email, password, name }),
  };
  return sendRequestWithRefresh(endpoints.user, requestInit);
}

export function refreshTokenRequest(): Promise<Response> {
  const requestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: getCookie(refreshToken) }),
  };
  return sendRequest(endpoints.token, requestInit);
}

export async function sendRequestWithRefresh(
  url: string,
  requestInit: RequestInit,
): Promise<TResponse<TUserResponse>> {
  try {
    const response = await sendRequest(url, requestInit);
    return await checkResponse<TResponse<TUserResponse>>(response);
  } catch (err) {
    if (err !== "jwt expired") {
      return Promise.reject(err);
    }
    const refreshData = await refreshTokenRequest().then(
      checkResponse<TResponse<TTokenResponse>>,
    );
    if (!refreshData.success) {
      return Promise.reject(refreshData);
    }
    setCookie(accessToken, refreshData.accessToken);
    setCookie(refreshToken, refreshData.refreshToken);
    requestInit.headers = { authorization: refreshData.accessToken };
    return sendRequest(url, requestInit).then(
      checkResponse<TResponse<TUserResponse>>,
    );
  }
}

export async function sendRequestGetOrder(orderNum: string): Promise<Response> {
  const requestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "",
    },
  };
  return sendRequest(`${endpoints.order}/${orderNum}`, requestInit);
}
