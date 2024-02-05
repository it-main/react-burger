import { checkResponse, sendRequest } from "../../utils/api";
import { CLEAR_SELECTED_INGREDIENTS } from "./burger-constructor";
import { getCookie } from "../../utils/cookie";
import { accessToken } from "../../utils/constants";

export const PLACE_ORDER_REQUEST = "PLACE_ORDER_REQUEST";
export const PLACE_ORDER_SUCCESS = "PLACE_ORDER_SUCCESS";
export const PLACE_ORDER_FAILED = "PLACE_ORDER_FAILED";
export const PLACE_ORDER_CLEAR_STATE = "PLACE_ORDER_CLEAR_STATE";

type TPlaceOrderRequest = {
  readonly type: typeof PLACE_ORDER_REQUEST;
};

type TPlaceOrderSuccess = {
  readonly type: typeof PLACE_ORDER_SUCCESS;
  readonly payload: number;
};

type TPlaceOrderFailed = {
  readonly type: typeof PLACE_ORDER_FAILED;
};

type TPlaceOrderClearState = {
  readonly type: typeof PLACE_ORDER_CLEAR_STATE;
};

export type TPlaceOrderActions =
  | TPlaceOrderRequest
  | TPlaceOrderSuccess
  | TPlaceOrderFailed
  | TPlaceOrderClearState;

export const placeAnOrder = (selectedIngredients: TSelectedIngredients) => {
  //TODO
  return function (dispatch: any) {
    dispatch({
      type: PLACE_ORDER_REQUEST,
    });

    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie(accessToken),
      },
      body: JSON.stringify({
        ingredients: [
          ...selectedIngredients.bun,
          ...selectedIngredients.fillings,
        ].map((elem) => elem._id),
      }),
    };

    sendRequest("orders", requestInit)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          dispatch({
            type: PLACE_ORDER_SUCCESS,
            payload: json.order.number,
          });
          dispatch({
            type: CLEAR_SELECTED_INGREDIENTS,
          });
        } else {
          console.log("Произошла ошибка, попробуйте еще раз");
          dispatch({
            type: PLACE_ORDER_FAILED,
          });
        }
      })
      .catch((error) => {
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
        dispatch({
          type: PLACE_ORDER_FAILED,
        });
      });
  };
};
