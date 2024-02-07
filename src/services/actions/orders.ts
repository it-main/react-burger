import { socketMiddleware } from "../middleware/socket-middleware";

export const ORDERS_CONNECT = "ORDERS_CONNECT";
export const ORDERS_DISCONNECT = "ORDERS_DISCONNECT";
export const ORDERS_WS_CONNECTING = "ORDERS_WS_CONNECTING";
export const ORDERS_WS_OPEN = "ORDERS_WS_OPEN";
export const ORDERS_WS_CLOSE = "ORDERS_WS_CLOSE";
export const ORDERS_WS_MESSAGE = "ORDERS_WS_MESSAGE";
export const ORDERS_WS_ERROR = "ORDERS_WS_ERROR";

type TOrdersConnect = {
  readonly type: typeof ORDERS_CONNECT;
  readonly payload: string;
};

type TOrdersDisconnect = {
  readonly type: typeof ORDERS_DISCONNECT;
};

type TOrdersWSConnecting = {
  readonly type: typeof ORDERS_WS_CONNECTING;
};

type TOrdersWSOpen = {
  readonly type: typeof ORDERS_WS_OPEN;
};

type TOrdersWSClose = {
  readonly type: typeof ORDERS_WS_CLOSE;
};

type TOrdersWSError = {
  readonly type: typeof ORDERS_WS_ERROR;
  readonly payload: string;
};

type TOrdersWSMessage = {
  readonly type: typeof ORDERS_WS_MESSAGE;
  readonly payload: {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
    message: string;
  };
};

export type TOrdersActions =
  | TOrdersConnect
  | TOrdersDisconnect
  | TOrdersWSConnecting
  | TOrdersWSOpen
  | TOrdersWSClose
  | TOrdersWSError
  | TOrdersWSMessage;

export const connect = (url: string) => ({
  type: ORDERS_CONNECT,
  payload: url,
});

export const disconnect = () => ({
  type: ORDERS_DISCONNECT,
});

export type OrdersActions = {
  readonly wsConnect: typeof ORDERS_CONNECT;
  readonly wsDisconnect: typeof ORDERS_DISCONNECT;
  readonly wsConnecting: typeof ORDERS_WS_CONNECTING;
  readonly onOpen: typeof ORDERS_WS_OPEN;
  readonly onClose: typeof ORDERS_WS_CLOSE;
  readonly onError: typeof ORDERS_WS_ERROR;
  readonly onMessage: typeof ORDERS_WS_MESSAGE;
};

export const ordersMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE,
});
