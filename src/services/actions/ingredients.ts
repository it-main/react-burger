import { checkResponse, sendRequest } from "../../utils/api";
import { AppDispatch } from "../types";
import { TResponse } from "../types/api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

type TGetIngredientsRequest = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

type TGetIngredientsFiled = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

type TGetIngredientsSuccess = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
};

export type TGetIngredientActions =
  | TGetIngredientsSuccess
  | TGetIngredientsRequest
  | TGetIngredientsFiled;

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    sendRequest("ingredients")
      .then(checkResponse<TResponse<{ data: TIngredient[] }>>)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: json.data,
          });
        } else {
          dispatch({ type: GET_INGREDIENTS_FAILED });
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: GET_INGREDIENTS_FAILED });
      });
  };
}
