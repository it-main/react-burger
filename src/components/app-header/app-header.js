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
          <NavLink
            Icon=<BurgerIcon />
            caption="Конструктор"
            classList="mr-2 pr-5"
          />
          <NavLink
            Icon=<ListIcon type="secondary" />
            caption="Лента заказов"
            classList="text_color_inactive pl-5"
          />
        </div>
        <a href="" className={styles.logo}>
          <Logo />
        </a>
        <NavLink
          Icon=<ProfileIcon type="secondary" />
          caption="Личный кабинет"
          classList="text_color_inactive"
        />
      </nav>
    </header>
  );
}

export default AppHeader;
