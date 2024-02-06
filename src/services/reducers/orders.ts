import { WSStatus } from "../../utils/constants";
import {
  ORDERS_DISCONNECT,
  ORDERS_WS_CLOSE,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
  TOrdersActions,
} from "../actions/orders";

type TOrdersReducer = {
  status:
    | typeof WSStatus.OFFLINE
    | typeof WSStatus.ONLINE
    | typeof WSStatus.CONNECTING;
  connectingError: string;
  orders: TOrder[];
  success: boolean;
  total: number;
  totalToday: number;
  message: string;
};

const initialState: TOrdersReducer = {
  status: WSStatus.OFFLINE,
  connectingError: "",
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  message: "",
};

export const ordersReducer = (state = initialState, action: TOrdersActions) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return {
        ...state,
        status: WSStatus.CONNECTING,
      };
    case ORDERS_WS_OPEN:
      return {
        ...state,
        status: WSStatus.ONLINE,
        connectingError: "",
      };
    case ORDERS_WS_CLOSE:
      return {
        ...state,
        status: WSStatus.OFFLINE,
      };
    case ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDERS_DISCONNECT:
      return {
        ...initialState,
      };
    case ORDERS_WS_MESSAGE:
      const { orders, success, total, totalToday, message } = action.payload;
      return {
        ...state,
        orders,
        success,
        total,
        totalToday,
        message,
      };
    default:
      return state;
  }
};
