import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { url } from "../../utils/constants";

function ProtectedRoute({ routeAuthorizedOnly = false, children }) {
  const { isAuth, isAuthChecked } = useSelector((state) => state.profile);
  const location = useLocation();

  if (!isAuthChecked) return <p>Загрузка...</p>;

  //Пользователь не авторизован, но роут только для авторизованного
  if (!isAuth ?? routeAuthorizedOnly) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  //Пользователь авторизован, но роут только для не авторизованного (login)
  if (isAuth && !routeAuthorizedOnly) {
    const to = location.state?.from || url.home;
    return <Navigate to={to} replace state={{ from: location.pathname }} />;
  }
  return children;
}
export default ProtectedRoute;
