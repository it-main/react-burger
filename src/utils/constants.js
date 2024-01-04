export const getStateIngredients = (state) => state.ingredients;
export const getStateBurgerConstructor = (state) => state.burgerConstructor;
export const getStateIngredientDetails = (state) => state.ingredientDetails;
export const getStateOrder = (state) => state.order;

export function linkIsActive(isActive) {
  return isActive ? "text_color_primary" : "text_color_inactive";
}

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
  notfound: "*",
};

export const endpoints = {
  api: "https://norma.nomoreparties.space/api",
  login: "auth/login",
  register: "auth/register",
  resetPassword: "password-reset",
  reset: "password-reset/reset",
  logout: "auth/logout",
  token: "auth/token",
  user: "auth/user",
};
