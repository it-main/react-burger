import styles from "./app.module.css";
import { clsx } from "clsx";
import AppHeader from "../app-header/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {
  return (
    <div className={`${styles.page}`}>
      <AppHeader />
      <main className={styles.content}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
