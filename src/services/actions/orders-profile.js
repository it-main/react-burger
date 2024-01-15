import { socketMiddleware } from "../middleware/socket-middleware";

export const ORDERS_CONNECT_PROFILE = "ORDERS_CONNECT_PROFILE";
export const ORDERS_DISCONNECT_PROFILE = "ORDERS_DISCONNECT_PROFILE";

export const ORDERS_WS_CONNECTING_PROFILE = "ORDERS_WS_CONNECTING_PROFILE";
export const ORDERS_WS_OPEN_PROFILE = "ORDERS_WS_OPEN_PROFILE";
export const ORDERS_WS_CLOSE_PROFILE = "ORDERS_WS_CLOSE_PROFILE";
export const ORDERS_WS_MESSAGE_PROFILE = "ORDERS_WS_MESSAGE_PROFILE";
export const ORDERS_WS_ERROR_PROFILE = "ORDERS_WS_ERROR_PROFILE";

export const connect = (url) => ({
  type: ORDERS_CONNECT_PROFILE,
  payload: url,
});

export const disconnect = () => ({
  type: ORDERS_DISCONNECT_PROFILE,
});

export const ordersProfileMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT_PROFILE,
  wsDisconnect: ORDERS_DISCONNECT_PROFILE,
  wsConnecting: ORDERS_WS_CONNECTING_PROFILE,
  onOpen: ORDERS_WS_OPEN_PROFILE,
  onClose: ORDERS_WS_CLOSE_PROFILE,
  onError: ORDERS_WS_ERROR_PROFILE,
  onMessage: ORDERS_WS_MESSAGE_PROFILE,
});
