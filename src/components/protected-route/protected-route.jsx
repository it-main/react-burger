import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/constants";
import PropTypes from "prop-types";

function ProtectedRoute({ routeAuthorizedOnly = false, component }) {
  const { isAuth, isAuthChecked } = useSelector((state) => state.profile);
  const location = useLocation();

  if (!isAuthChecked) return <h2>Загрузка...</h2>;

  //Пользователь не авторизован, но роут только для авторизованного (profile)
  if (!isAuth && routeAuthorizedOnly) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  //Пользователь авторизован, но роут только для не авторизованного (login)
  if (isAuth && !routeAuthorizedOnly) {
    const to = location.state?.from || routes.home;
    return <Navigate to={to} replace state={{ from: location.pathname }} />;
  }
  return component;
}

ProtectedRoute.propTypes = {
  routeAuthorizedOnly: PropTypes.bool,
  component: PropTypes.element,
};

export default ProtectedRoute;
