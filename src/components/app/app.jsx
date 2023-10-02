import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect, useReducer } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import {
  URL_FORGOT_PASSWORD,
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
  getStateBurgerConstructor,
  getStateIngredients,
} from "../../utils/constants";
import HomePage from "../../pages/home";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";

function App() {
  const dispatch = useDispatch();
  const { statusAvailableIngredients } = useSelector(getStateIngredients);
  const { selectedIngredients } = useSelector(getStateBurgerConstructor);
  const [, dispatchSumIngredients] = useReducer(
    reducerBurgerSum,
    { price: 0 },
    undefined
  );

  function reducerBurgerSum(state, action) {
    if (action.type === "price") {
      const price =
        selectedIngredients.bun.reduce(
          (sum, element) => sum + element.price * 2,
          0
        ) +
        selectedIngredients.fillings.reduce(
          (sum, element) => sum + element.price,
          0
        );
      return { price: price };
    }
    return state;
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatchSumIngredients({ type: "price" });
  }, [selectedIngredients]);

  function DownloadStatus() {
    switch (statusAvailableIngredients) {
      case undefined:
        return <p className={"text_type_main-medium"}>Загрузка данных...</p>;
      case false:
        return (
          <p>
            Произошла ошибка при загрузке данных с сервера, попробуйте обновить
            страницу
          </p>
        );
      default:
        return undefined;
    }
  }

  return (
    <div className={`${styles.page}`}>
      <AppHeader />
      <DownloadStatus />
      <Routes>
        <Route path={URL_HOME} element={<HomePage />} />
        <Route path={URL_LOGIN} element={<LoginPage />} />
        <Route path={URL_REGISTER} element={<RegisterPage />} />
        <Route path={URL_FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Routes>
    </div>
  );
}
export default App;
