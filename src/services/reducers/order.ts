import {
  PLACE_ORDER_CLEAR_STATE,
  PLACE_ORDER_FAILED,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  TPlaceOrderActions,
} from "../actions/order";

type TOrderReducer = {
  orderNumber: string;
  statusOrderNumber: boolean | undefined;
};

const initialState: TOrderReducer = {
  orderNumber: "",
  statusOrderNumber: undefined,
};

export const orderReducer = (
  state = initialState,
  action: TPlaceOrderActions,
) => {
  switch (action.type) {
    case PLACE_ORDER_REQUEST: {
      return {
        ...state,
        // orderNumber: action.payload,
        statusOrderNumber: undefined,
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
        orderNumber: "",
      };
    }
    case PLACE_ORDER_CLEAR_STATE: {
      return {
        ...state,
        orderNumber: "",
        statusOrderNumber: undefined,
      };
    }
    default:
      return state;
  }
};
