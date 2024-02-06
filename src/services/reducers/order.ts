import {
  PLACE_ORDER_CLEAR_STATE,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  TPlaceOrderActions,
} from "../actions/order";

type TOrderReducer = {
  orderNumber: number | undefined;
  statusOrderNumber: boolean;
};

const initialState: TOrderReducer = {
  orderNumber: undefined,
  statusOrderNumber: false,
};

export const orderReducer = (
  state = initialState,
  action: TPlaceOrderActions,
) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        statusOrderNumber: false,
      };
    }
    case PLACE_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        statusOrderNumber: true,
      };
    }
    case PLACE_ORDER_FAILED: {
      return {
        ...state,
        statusOrderNumber: false,
        orderNumber: undefined,
      };
    }
    case PLACE_ORDER_CLEAR_STATE: {
      return {
        ...state,
        orderNumber: undefined,
        statusOrderNumber: false,
      };
    }
    default:
      return state;
  }
};
