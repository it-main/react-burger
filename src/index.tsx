import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

import {
  applyMiddleware,
  compose,
  legacy_createStore as createStore,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { rootReducer } from "./services/reducers";
import { BrowserRouter } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  ORDERS_CONNECT,
  ORDERS_DISCONNECT,
  ORDERS_WS_CLOSE,
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
} from "./services/actions/orders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const ordersMiddleware = socketMiddleware({
  wsConnect: ORDERS_CONNECT,
  wsDisconnect: ORDERS_DISCONNECT,
  wsConnecting: ORDERS_WS_CONNECTING,
  onOpen: ORDERS_WS_OPEN,
  onClose: ORDERS_WS_CLOSE,
  onError: ORDERS_WS_ERROR,
  onMessage: ORDERS_WS_MESSAGE,
});

const enhancer = composeEnhancers(applyMiddleware(thunk, ordersMiddleware));

const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/*redux*/}
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
