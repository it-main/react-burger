import {
  BurgerIcon,
  Logo,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import NavLink from "../nav-link/nav-link";

function AppHeader() {
  return (
    <header>
      <nav className={`pt-4 pb-4 mb-10 ${styles.navigate}`}>
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
        <div className={styles.logo}>
          <Logo />
        </div>
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
