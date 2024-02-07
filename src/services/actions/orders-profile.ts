import { socketMiddleware } from "../middleware/socket-middleware";

export const ORDERS_CONNECT_PROFILE = "ORDERS_CONNECT_PROFILE";
export const ORDERS_DISCONNECT_PROFILE = "ORDERS_DISCONNECT_PROFILE";
export const ORDERS_WS_CONNECTING_PROFILE = "ORDERS_WS_CONNECTING_PROFILE";
export const ORDERS_WS_OPEN_PROFILE = "ORDERS_WS_OPEN_PROFILE";
export const ORDERS_WS_CLOSE_PROFILE = "ORDERS_WS_CLOSE_PROFILE";
export const ORDERS_WS_MESSAGE_PROFILE = "ORDERS_WS_MESSAGE_PROFILE";
export const ORDERS_WS_ERROR_PROFILE = "ORDERS_WS_ERROR_PROFILE";

type TOrdersConnectProfile = {
  readonly type: typeof ORDERS_CONNECT_PROFILE;
  readonly payload: string;
};

type TOrdersDisconnectProfile = {
  readonly type: typeof ORDERS_DISCONNECT_PROFILE;
};

type TOrdersWSConnectingProfile = {
  readonly type: typeof ORDERS_WS_CONNECTING_PROFILE;
};

type TOrdersWSOpenProfile = {
  readonly type: typeof ORDERS_WS_OPEN_PROFILE;
};

type TOrdersWSCloseProfile = {
  readonly type: typeof ORDERS_WS_CLOSE_PROFILE;
};

type TOrdersWSErrorProfile = {
  readonly type: typeof ORDERS_WS_ERROR_PROFILE;
  readonly payload: string;
};

type TOrdersWSMessageProfile = {
  readonly type: typeof ORDERS_WS_MESSAGE_PROFILE;
  readonly payload: {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
    message: string;
  };
};

export type TOrdersProfileActions =
  | TOrdersConnectProfile
  | TOrdersDisconnectProfile
  | TOrdersWSConnectingProfile
  | TOrdersWSOpenProfile
  | TOrdersWSCloseProfile
  | TOrdersWSErrorProfile
  | TOrdersWSMessageProfile;

export const connect = (url: string) => ({
  type: ORDERS_CONNECT_PROFILE,
  payload: url,
});

export const disconnect = () => ({
  type: ORDERS_DISCONNECT_PROFILE,
});

export type OrdersProfileActions = {
  readonly wsConnect: typeof ORDERS_CONNECT_PROFILE;
  readonly wsDisconnect: typeof ORDERS_DISCONNECT_PROFILE;
  readonly wsConnecting: typeof ORDERS_WS_CONNECTING_PROFILE;
  readonly onOpen: typeof ORDERS_WS_OPEN_PROFILE;
  readonly onClose: typeof ORDERS_WS_CLOSE_PROFILE;
  readonly onError: typeof ORDERS_WS_ERROR_PROFILE;
  readonly onMessage: typeof ORDERS_WS_MESSAGE_PROFILE;
};

export const ordersProfileMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT_PROFILE,
  wsDisconnect: ORDERS_DISCONNECT_PROFILE,
  wsConnecting: ORDERS_WS_CONNECTING_PROFILE,
  onOpen: ORDERS_WS_OPEN_PROFILE,
  onClose: ORDERS_WS_CLOSE_PROFILE,
  onError: ORDERS_WS_ERROR_PROFILE,
  onMessage: ORDERS_WS_MESSAGE_PROFILE,
});
