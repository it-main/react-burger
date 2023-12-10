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
  url
} from "../../utils/constants";

function AppHeader() {
  return (
    <header>
      <nav className={clsx("pt-4 pb-4", styles.navigate)}>
        <div>
          {/*pt-4 pb-4*/}
          <NavLink
            to={url.home}
            className={({ isActive }) =>
              clsx(styles.link, linkIsActive(isActive))
            }
          >
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </NavLink>
          <NavLink
            to={url.feed}
            className={({ isActive }) =>
              clsx("pl-5", styles.link, linkIsActive(isActive))
            }
          >
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to={url.home} className={styles.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to={url.profile}
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
