import { getCookie } from "./cookie";
import { accessToken } from "./constants";

export const orderStatus = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};

export function burgerPrice(ingredients) {
  return ingredients.reduce((price, item) => {
    return price + item.price;
  }, 0);
}

export function orderIngredientsNormalised(ingredients) {
  return ingredients.filter((item) => Boolean(item));
}

export function getToken(typeToken) {
  const token = getCookie(typeToken);
  if (token && typeToken === accessToken) {
    return token.split("Bearer ")[1];
  }
  return token;
}
