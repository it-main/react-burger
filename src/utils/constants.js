export const getStateIngredients = (state) => state.ingredients;
export const getStateBurgerConstructor = (state) => state.burgerConstructor;
export const getStateOrder = (state) => state.order;

export const accessToken = "accessToken";
export const refreshToken = "refreshToken";
export const forgotPassword = "forgotPassword";

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgot: "/forgot-password",
  reset: "/reset-password",
  profile: "/profile",
  orders: "orders",
  feed: "/feed",
  ingredient: "/ingredients/:ingredientId",
  order: "/feed/:orderNum",
  profileOrder: "/profile/orders/:orderNum",
  notfound: "*",
};

export const endpoints = {
  api: "https://norma.nomoreparties.space/api",
  order: "orders",
  login: "auth/login",
  register: "auth/register",
  resetPassword: "password-reset",
  reset: "password-reset/reset",
  logout: "auth/logout",
  token: "auth/token",
  user: "auth/user",
  apiOrders: "wss://norma.nomoreparties.space/orders",
  ordersAll: "/all",
};

export const WSStatus = {
  CONNECTING: "CONNECTING",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};
