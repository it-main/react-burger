import {CLOSE_PLACE_ORDER, GET_ORDER_NUMBER_FAILED, GET_ORDER_NUMBER_SUCCESS} from "../actions/order";

const initialState = {
  orderNumber: undefined,
  statusOrderNumber: undefined,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        statusOrderNumber: true,
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        statusOrderNumber: false
      }
    }
    case CLOSE_PLACE_ORDER: {
      return {
        ...state,
        orderNumber: undefined,
      }
    }
    default: return state
  }
}
