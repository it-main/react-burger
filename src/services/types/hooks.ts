import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";
import { AppDispatch, AppThunk, RootState } from "./index";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
type TUseDispatch = () => AppDispatch | AppThunk;
export const useDispatch: TUseDispatch = dispatchHook;
