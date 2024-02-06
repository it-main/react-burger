import { getCookie } from "./cookie";
import { accessToken, refreshToken } from "./constants";

export const orderStatus = {
  done: "Выполнен",
  pending: "Готовится",
  created: "Создан",
};

export function getOrderStatus(status: string) {
  return status === "done"
    ? orderStatus.done
    : status === "created"
    ? orderStatus.created
    : orderStatus.pending;
}

export function burgerPrice(ingredients: TIngredient[]) {
  return ingredients.reduce((price, item) => {
    return price + item.price;
  }, 0);
}

export function orderIngredientsNormalised(ingredients: string[]) {
  return ingredients.filter((item) => Boolean(item));
}

export function getToken(typeToken: typeof accessToken | typeof refreshToken) {
  const token = getCookie(typeToken);
  if (token && typeToken === accessToken) {
    return token.split("Bearer ")[1];
  }
  return token;
}
