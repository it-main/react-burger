import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { routes } from "../../utils/constants";

function ProtectedRoute({ routeAuthorizedOnly = false, component }) {
  const { isAuth, isAuthChecked } = useSelector((state) => state.profile);
  const location = useLocation();

  if (!isAuthChecked) return <p>Загрузка...</p>;

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
export default ProtectedRoute;
