import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
// import NavLink from "../nav-link/nav-link";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { URL_HOME, URL_LOGIN } from "../../utils/constants";

function AppHeader() {
  return (
    <header>
      <nav className={clsx("pt-4 pb-4", styles.navigate)}>
        <div>
          {/*pt-4 pb-4*/}
          <NavLink to={URL_HOME} end className={styles.link}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </NavLink>
          <NavLink className={clsx("text_color_inactive pl-5", styles.link)}>
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to={URL_HOME} className={styles.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to={URL_LOGIN}
          className={clsx("text_color_inactive", styles.link)}
        >
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
