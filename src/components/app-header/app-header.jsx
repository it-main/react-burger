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
          <NavLink className={clsx("mr-2 pr-5", styles.link)}>
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
          <NavLink classList="text_color_inactive pl-5">
            <ListIcon type="secondary" />
            Лента заказов
          </NavLink>
        </div>
        <a href="#" className={styles.logo}>
          <Logo />
        </a>
        <NavLink classList="text_color_inactive">
          <ProfileIcon type="secondary" />
          Личный кабинет
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
