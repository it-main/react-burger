export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;
    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsConnecting,
        wsDisconnect,
        wsSendMessage,
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

      if (type === wsSendMessage && socket) {
        socket.send(JSON.stringify(action.payload));
      }

      if (type === wsDisconnect && socket) {
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
