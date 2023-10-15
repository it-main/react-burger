import { clsx } from "clsx";
import style from "./profile.module.css";
import {
  linkIsActive,
  URL_FEED,
  URL_LOGIN,
  URL_PROFILE,
} from "../utils/constants";
import { NavLink } from "react-router-dom";

function Profile() {
  return (
    <div className={clsx(style.content)}>
      <div className={style.menu}>
        <nav className={style.navigate}>
          <NavLink
            to={URL_PROFILE}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.link,
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
                style.link,
                linkIsActive(isActive),
              )
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={URL_LOGIN}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.link,
                linkIsActive(isActive),
              )
            }
          >
            Выход
          </NavLink>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
    </div>
  );
}

export default Profile;
