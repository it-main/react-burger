import { WSStatus } from "../../utils/constants";
import {
  ORDERS_DISCONNECT_PROFILE,
  ORDERS_WS_CLOSE_PROFILE,
  ORDERS_WS_CONNECTING_PROFILE,
  ORDERS_WS_ERROR_PROFILE,
  ORDERS_WS_MESSAGE_PROFILE,
  ORDERS_WS_OPEN_PROFILE,
  TOrdersProfileActions,
} from "../actions/orders-profile";

type OrdersProfileReducer = {
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

const initialState: OrdersProfileReducer = {
  status: WSStatus.OFFLINE,
  connectingError: "",
  orders: [],
  success: false,
  total: 0,
  totalToday: 0,
  message: "",
};

export const ordersProfileReducer = (
  state = initialState,
  action: TOrdersProfileActions,
) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING_PROFILE:
      return {
        ...state,
        status: WSStatus.CONNECTING,
      };
    case ORDERS_WS_OPEN_PROFILE:
      return {
        ...state,
        status: WSStatus.ONLINE,
        connectingError: "",
      };
    case ORDERS_WS_CLOSE_PROFILE:
      return {
        ...state,
        status: WSStatus.OFFLINE,
      };
    case ORDERS_WS_ERROR_PROFILE:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDERS_DISCONNECT_PROFILE:
      return {
        ...initialState,
      };
    case ORDERS_WS_MESSAGE_PROFILE:
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
