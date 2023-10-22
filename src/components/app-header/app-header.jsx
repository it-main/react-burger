import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  linkIsActive,
  URL_FEED,
  URL_HOME,
  URL_PROFILE,
} from "../../utils/constants";

function AppHeader() {
  return (
    <header>
      <nav className={clsx("pt-4 pb-4", styles.navigate)}>
        <div>
          {/*pt-4 pb-4*/}
          <NavLink
            to={URL_HOME}
            className={({ isActive }) =>
              clsx(styles.link, linkIsActive(isActive))
            }
          >
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </NavLink>
          <NavLink
            to={URL_FEED}
            className={({ isActive }) =>
              clsx("pl-5", styles.link, linkIsActive(isActive))
            }
          >
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to={URL_HOME} className={styles.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to={URL_PROFILE}
          className={({ isActive }) =>
            clsx(styles.link, linkIsActive(isActive))
          }
        >
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
