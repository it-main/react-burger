import {checkResponse, sendRequest} from "../../utils/api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR';
export const ADD_INGREDIENT_DETAILS = 'ADD_INGREDIENT_DETAILS';
export const DELETE_INGREDIENT_DETAILS = 'DELETE_INGREDIENT_DETAILS';



export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';

export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';

export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const CLOSE_PLACE_ORDER = 'CLOSE_PLACE_ORDER';


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
          dispatch({type: GET_INGREDIENTS_FAILED});
          console.error('Ошибка получения данных с сервера');
        }
      })
      .catch(error => {
        console.error(error);
        dispatch({type: GET_INGREDIENTS_FAILED});
      });
  };
}

export const getOrderNumber = (selectedIngredients, openModal) => {
  return function(dispatch) {

    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: [...selectedIngredients.bun, ...selectedIngredients.fillings].map(elem => elem._id)}),
    }

    sendRequest('orders', requestInit)
      .then(checkResponse)
      .then(json => {
        if (json.success) {
          dispatch({
            type: GET_ORDER_NUMBER_SUCCESS,
            payload: json.order.number
          })
          openModal();
        } else {
          console.log("Произошла ошибка, попробуйте еще раз");
          dispatch({
            type: GET_ORDER_NUMBER_FAILED
          })
        }
      })
      .catch(error => {
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
        dispatch({
          type: GET_ORDER_NUMBER_FAILED
        })
      });
  }
};