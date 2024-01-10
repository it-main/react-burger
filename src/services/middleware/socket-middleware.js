import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CLOSE,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
} from "../actions/orders";
import { endpoints } from "../../utils/constants";

export const socketMiddleware = (store) => {
  let socket = null;
  return (next) => (action) => {
    const { dispatch } = store;
    const { type } = action;

    if (type === ORDERS_CONNECT) {
      socket = new WebSocket(`${endpoints.apiOrders}${action.payload}`);
      dispatch({ type: ORDERS_WS_CONNECTING });
    }

    if (socket) {
      socket.onopen = () => dispatch({ type: ORDERS_WS_OPEN });
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        dispatch({ type: ORDERS_WS_MESSAGE, payload: parsedData });
      };
      socket.onclose = () => dispatch({ type: ORDERS_WS_CLOSE });
      socket.onerror = () => {
        dispatch({ type: ORDERS_WS_ERROR, payload: "Error" });
      };

      if (type === ORDERS_DISCONNECT) {
        socket.close();
        socket = null;
        dispatch({ type: ORDERS_DISCONNECT });
      }
    }
    next(action);
  };
};
