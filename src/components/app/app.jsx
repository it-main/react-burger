import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredients";
import {
  getStateBurgerConstructor,
  getStateIngredients,
  routes,
} from "../../utils/constants";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import Orders from "../orders/orders";
import NotFound from "../../pages/not-found";
import styles from "./app.module.css";
import ProtectedRoute from "../protected-route/protected-route";
import { checkUserAuth } from "../../services/actions/profile";
import ProfileForm from "../profile-form/profile-form";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Ingredient from "../../pages/ingredient";
import Feed from "../../pages/feed";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { statusAvailableIngredients } = useSelector(getStateIngredients);
  const { selectedIngredients } = useSelector(getStateBurgerConstructor);
  const [, dispatchSumIngredients] = useReducer(
    reducerBurgerSum,
    { price: 0 },
    undefined,
  );
  useEffect(() => {
    //TODO
    // console.log("useEffect checkUserAuth");
    dispatch(checkUserAuth());
  }, [location.pathname]);

  const handleModalClose = () => {
    navigate(routes.home, { replace: true });
  };

  function reducerBurgerSum(state, action) {
    if (action.type === "price") {
      const price =
        selectedIngredients.bun.reduce(
          (sum, element) => sum + element.price * 2,
          0,
        ) +
        selectedIngredients.fillings.reduce(
          (sum, element) => sum + element.price,
          0,
        );
      return { price: price };
    }
    return state;
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

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
        <Route path={routes.home} element={<HomePage />} />

        <Route path={routes.feed} element={<Feed />} />

        <Route
          path={routes.ingredient}
          element={
            location?.state?.background ? (
              <Modal
                header={"Детали ингредиента"}
                closeModal={handleModalClose}
              >
                <IngredientDetails />
              </Modal>
            ) : (
              <Ingredient />
            )
          }
        />

        <Route
          path={routes.register}
          element={<ProtectedRoute component={<Register />} />}
        />

        <Route
          path={routes.forgot}
          element={<ProtectedRoute component={<ForgotPassword />} />}
        />

        <Route path={routes.reset} element={<ResetPassword />} />

        <Route
          path={routes.login}
          element={<ProtectedRoute component={<Login />} />}
        />

        <Route
          path={routes.profile}
          element={
            <ProtectedRoute routeAuthorizedOnly component={<Profile />} />
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path={routes.orders} element={<Orders />} />
        </Route>

        <Route path={routes.notfound} element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
