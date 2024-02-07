import store from "../store";
import { TOrdersActions } from "../actions/orders";
import { TPlaceOrderActions } from "../actions/order";
import { TOrdersProfileActions } from "../actions/orders-profile";
import { TGetIngredientActions } from "../actions/ingredients";
import { TProfileActions } from "../actions/profile";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorActions } from "../actions/burger-constructor";

type TApplicationActions =
  | TBurgerConstructorActions
  | TGetIngredientActions
  | TPlaceOrderActions
  | TOrdersActions
  | TOrdersProfileActions
  | TProfileActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
