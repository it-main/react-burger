import store from "../store";
import { TOrdersActions } from "../actions/orders";
import { TPlaceOrderActions } from "../actions/order";
import { TOrdersProfileActions } from "../actions/orders-profile";
import { TGetIngredientActions } from "../actions/ingredients";
import { TProfileActions } from "../actions/profile";
import { Action, ActionCreator } from "redux";
import { ThunkAction } from "redux-thunk";

export type RootState = ReturnType<typeof store.getState>;

type TApplicationActions =
  | TOrdersActions
  | TPlaceOrderActions
  | TOrdersProfileActions
  | TGetIngredientActions
  | TProfileActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
//export type AppDispatch = Dispatch<TApplicationActions>;
