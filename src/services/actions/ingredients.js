import { checkResponse, sendRequest } from "../../utils/api";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    sendRequest("ingredients")
      .then(checkResponse)
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
