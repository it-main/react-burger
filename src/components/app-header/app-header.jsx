import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { linkIsActive, routes } from "../../utils/constants";

function AppHeader() {
  const { pathname } = useLocation();

  return (
    <header>
      <nav className={clsx("pt-4 pb-4", styles.navigate)}>
        <div>
          {/*pt-4 pb-4*/}
          <NavLink
            to={routes.home}
            className={({ isActive }) =>
              clsx(styles.link, linkIsActive(isActive))
            }
          >
            <BurgerIcon
              type={pathname === routes.home ? "primary" : "secondary"}
            />
            <span>Конструктор</span>
          </NavLink>
          <NavLink
            to={routes.feed}
            className={({ isActive }) =>
              clsx("pl-5", styles.link, linkIsActive(isActive))
            }
          >
            <ListIcon
              type={pathname === routes.feed ? "primary" : "secondary"}
            />
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to={routes.home} className={styles.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to={routes.profile}
          className={({ isActive }) =>
            clsx(styles.link, linkIsActive(isActive))
          }
        >
          <ProfileIcon
            type={pathname.includes(routes.profile) ? "primary" : "secondary"}
          />
          <span>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
