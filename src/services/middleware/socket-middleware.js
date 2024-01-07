import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CLOSE,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
} from "../actions/orders";

export const socketMiddleware = (store) => {
  // return (store) => {
  let socket = null;
  return (next) => (action) => {
    const { dispatch } = store;
    const { type } = action;

    if (type === ORDERS_CONNECT) {
      // console.log(`ORDERS_CONNECT`);
      socket = new WebSocket(action.payload);
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
      socket.onerror = (err) => {
        dispatch({ type: ORDERS_WS_ERROR, payload: "Error" });
      };

      // if (type === wsSendMessage) {
      //   socket.send(JSON.stringify(action.payload));
      // }

      if (type === ORDERS_DISCONNECT) {
        // console.log(`ORDERS_DISCONNECT`);
        socket.close();
        socket = null;
      }
    }
    next(action);
  };
  // };
};
