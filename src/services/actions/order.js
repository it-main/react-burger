import {checkResponse, sendRequest} from "../../utils/api";

export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const CLOSE_PLACE_ORDER = 'CLOSE_PLACE_ORDER';

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