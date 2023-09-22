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

function AppHeader() {
  return (
    <header className={"mb-10"}>
      <nav className={clsx("pt-4 pb-4", styles.navigate)}>
        <div>
          {/*pt-4 pb-4*/}
          <NavLink to="." end className={styles.link}>
            <BurgerIcon type="primary" />
            <span>Конструктор</span>
          </NavLink>
          <NavLink
            to="lenta"
            className={clsx("text_color_inactive pl-5", styles.link)}
          >
            <ListIcon type="secondary" />
            <span>Лента заказов</span>
          </NavLink>
        </div>
        <a href="#" className={styles.logo}>
          <Logo />
        </a>
        <NavLink to="box" className={clsx("text_color_inactive", styles.link)}>
          <ProfileIcon type="secondary" />
          <span>Личный кабинет</span>
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
