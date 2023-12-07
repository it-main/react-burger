import { clsx } from "clsx";
import style from "./profile.module.css";
import {
  linkIsActive,
  URL_FEED,
  URL_LOGIN,
  URL_PROFILE,
} from "../utils/constants";
import { NavLink } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Profile() {
  const handleExit = () => {};

  return (
    <div className={clsx(style.content)}>
      <div className={style.menu}>
        <nav className={style.navigate}>
          <NavLink
            to={URL_PROFILE}
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
            to={URL_FEED}
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
            onClick={handleExit}
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
    </div>
  );
}

export default Profile;
