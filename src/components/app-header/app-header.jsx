import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavLink from "../nav-link/nav-link";
import { clsx } from "clsx";
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
          <NavLink caption="Конструктор" classList="mr-2 pr-5">
            <BurgerIcon type="primary" />
          </NavLink>
          <NavLink caption="Лента заказов" classList="text_color_inactive pl-5">
            <ListIcon type="secondary" />
          </NavLink>
        </div>
        <a href="#" className={styles.logo}>
          <Logo />
        </a>
        <NavLink caption="Личный кабинет" classList="text_color_inactive">
          <ProfileIcon type="secondary" />
        </NavLink>
      </nav>
    </header>
  );
}

export default AppHeader;
