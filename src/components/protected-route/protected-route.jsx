import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { URL_HOME, URL_LOGIN } from "../../utils/constants";

function ProtectedRoute({ onlyUnAuth = false, children }) {
  const { isAuth, isAuthChecked } = useSelector((state) => state.profile);
  const location = useLocation();
  const from = location.state?.from || URL_HOME;

  if (!isAuthChecked) return null;

  console.log(onlyUnAuth, isAuth);
  if (!onlyUnAuth && !isAuth) {
    return (
      <Navigate to={URL_LOGIN} replace state={{ from: location.pathname }} />
    );
  }

  return children;
}
export default ProtectedRoute;
