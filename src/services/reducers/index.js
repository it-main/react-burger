import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { orderReducer } from "./order";
import { burgerConstructorReducer } from "./burger-constructor";
import { profileReducer } from "./profile";
import { ordersReducer } from "./orders";
import { ordersProfileReducer } from "./orders-profile";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  burgerConstructor: burgerConstructorReducer,
  profile: profileReducer,
  orders: ordersReducer,
  ordersProfile: ordersProfileReducer,
});
