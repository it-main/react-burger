import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { getIngredients } from "../../services/actions/ingredients";
import { getStateBurgerConstructor, routes } from "../../utils/constants";
import Register from "../../pages/register";
import AppHeader from "../app-header/app-header";
import HomePage from "../../pages/home";
import Login from "../../pages/login";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile";
import ProfileOrders from "../profile-orders/profile-orders";
import NotFound from "../../pages/not-found";
import styles from "./app.module.css";
import ProtectedRoute from "../protected-route/protected-route";
import Feed from "../../pages/feed";
import { checkUserAuth } from "../../services/actions/profile";
import ProfileForm from "../profile-form/profile-form";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import Ingredient from "../../pages/ingredient";
import Order from "../order/order";
import { useDispatch, useSelector } from "../../services/types/hooks";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;
  const { selectedIngredients } = useSelector(getStateBurgerConstructor);
  const [, dispatchSumIngredients] = useReducer(
    reducerBurgerSum,
    { price: 0 },
    undefined,
  );
  useEffect(() => {
    dispatch(checkUserAuth());
  }, [location.pathname]);

  const handleModalClose = () => {
    //TODO
    // navigate(-1, { replace: true });
    navigate(-1);
  };

  function reducerBurgerSum(
    state: { price: number },
    action: { type: string },
  ) {
    if (action.type === "price") {
      const price =
        selectedIngredients.bun.reduce(
          (sum: number, element: TIngredient) => sum + element.price * 2,
          0,
        ) +
        selectedIngredients.fillings.reduce(
          (sum: number, element: TIngredient) => sum + element.price,
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

  return (
    <div className={`${styles.page}`}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path={routes.home} element={<HomePage />} />

        <Route path={routes.feed} element={<Feed />} />

        <Route path={routes.order} element={<Order isPage={true} />} />

        <Route
          path={routes.profileOrder}
          element={
            <ProtectedRoute
              routeAuthorizedOnly
              component={<Order isPage={true} />}
            />
          }
        />

        <Route path={routes.ingredient} element={<Ingredient />} />

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
          <Route path={routes.orders} element={<ProfileOrders />} />
        </Route>

        <Route path={routes.notfound} element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path={routes.ingredient}
            element={
              <Modal closeModal={() => handleModalClose()}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={routes.order}
            element={
              <Modal closeModal={() => handleModalClose()}>
                <Order />
              </Modal>
            }
          />
          <Route
            path={routes.profileOrder}
            element={
              //TODO
              // <Modal closeModal={() => handleModalClose(routes.orders)}>
              <Modal closeModal={() => handleModalClose()}>
                <Order />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
}
export default App;
