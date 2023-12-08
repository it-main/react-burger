export const getStateIngredients = (state) => state.ingredients;
export const getStateBurgerConstructor = (state) => state.burgerConstructor;
export const getStateIngredientDetails = (state) => state.ingredientDetails;
export const getStateOrder = (state) => state.order;

export function linkIsActive(isActive) {
  return isActive ? "text_color_primary" : "text_color_inactive";
}

export const accessToken = "accessToken";
export const refreshToken = "refreshToken";

export const URL_API = "https://norma.nomoreparties.space/api";
export const URL_HOME = "/";
export const URL_LOGIN = "/login";
export const URL_REGISTER = "/register";
export const URL_FORGOT_PASSWORD = "/forgot-password";
export const URL_RESET_PASSWORD = "/reset-password";
export const URL_PROFILE = "/profile";
export const URL_FEED = "/feed";
export const URL_NOTFOUND = "*";
