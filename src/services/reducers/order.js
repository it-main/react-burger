import {
  CLOSE_PLACE_ORDER,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS
} from "../actions/order";

const initialState = {
  orderNumber: "",
  statusOrderNumber: undefined,
};
export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumber: action.payload,
        statusOrderNumber: undefined,
      }
    }
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
        statusOrderNumber: false,
        orderNumber: ""
      }
    }
    case CLOSE_PLACE_ORDER: {
      return {
        ...state,
        orderNumber: "",
        statusOrderNumber: undefined
      }
    }
    default: return state
  }
}
