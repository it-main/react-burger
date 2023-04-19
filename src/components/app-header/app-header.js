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
          <NavLink Icon={BurgerIcon} caption="Конструктор" />
          <NavLink Icon={ListIcon} caption="Лента заказов" />
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavLink Icon={ProfileIcon} caption="Личный кабинет" />
      </nav>
    </header>
  );
}

export default AppHeader;
