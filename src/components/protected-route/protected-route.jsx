import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { URL_LOGIN } from "../../utils/constants";

function ProtectedRoute(props) {
  const { isAuth } = useSelector((state) => state.profile);
  const location = useLocation();

  if (!isAuth)
    return (
      <Navigate to={URL_LOGIN} replace state={{ from: location.pathname }} />
    );

  return <Outlet />;
}
export default ProtectedRoute;
