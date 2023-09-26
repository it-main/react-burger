import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { useEffect, useReducer } from "react";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import {
  getStateBurgerConstructor,
  getStateIngredients,
} from "../../utils/constants";
import HomePage from "../../pages/home";
import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/login";

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
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
export default App;
