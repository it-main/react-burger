import { OrdersActions } from "../actions/orders";
import { OrdersProfileActions } from "../actions/orders-profile";
import { AnyAction, MiddlewareAPI } from "redux";

export const socketMiddleware = (
  wsActions: OrdersActions | OrdersProfileActions,
) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;
    return (next: (action: AnyAction) => unknown) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;

      if (type === wsConnect) {
        socket = new WebSocket(action.payload);
        dispatch({ type: wsConnecting });
        socket.onopen = () => dispatch({ type: onOpen });
        socket.onclose = () => dispatch({ type: onClose });
        socket.onerror = () => dispatch({ type: onError, payload: "Error" });
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: onMessage, payload: parsedData });
        };
      }

      if (type === wsDisconnect && socket) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
