import {checkResponse, sendRequest} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';
export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

function actionFailed(error) {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: error
  }
}
export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    sendRequest('ingredients')
      .then(checkResponse)
      .then(json => {
        //const dataIngredients = json.success ? {status: json.success, data: json.data} : {status: false};
        //handleSetData(dataIngredients);
        if (json.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            payload: json.data
          })
        } else {
          const error = 'Ошибка получения данных с сервера';
          dispatch(actionFailed(error));
          console.error(error);
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(actionFailed(error));
      });
  };
}

