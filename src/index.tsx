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
import { ordersMiddleware } from "./services/actions/orders";
import { ordersProfileMiddleware } from "./services/actions/orders-profile";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, ordersMiddleware, ordersProfileMiddleware),
);

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
