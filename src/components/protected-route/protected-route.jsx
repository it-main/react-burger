import {useSelector} from "react-redux";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {URL_LOGIN} from "../../utils/constants";

function ProtectedRoute(props) {
  const {isAuth} = useSelector(state => state.profile);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isAuth) {
      navigate(URL_LOGIN, {replace: true})
    }
  }, [location, navigate, isAuth]);
  return (
    <Outlet/>
  );
}

export default ProtectedRoute;