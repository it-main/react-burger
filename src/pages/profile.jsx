import { clsx } from "clsx";
import style from "./profile.module.css";
import { linkIsActive, routes } from "../utils/constants";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { signOut } from "../services/actions/profile";

function Profile() {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className={clsx(style.content)}>
      <div className={style.menu}>
        <nav className={style.navigate}>
          <NavLink
            to={routes.profile}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.navItem,
                linkIsActive(isActive),
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={routes.orders}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.navItem,
                linkIsActive(isActive),
              )
            }
          >
            История заказов
          </NavLink>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleSignOut}
            extraClass={clsx(
              style.navItem,
              style.navExit,
              "text text_type_main-medium text_color_inactive",
            )}
          >
            Выход
          </Button>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Profile;
