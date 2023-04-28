import styles from "./ingredient.module.css";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function Ingredient({ ingredientData }) {
  return (
    <li className={clsx(styles.ingredient)}>
      <img
        className={clsx(styles.image)}
        src={ingredientData.image}
        alt={ingredientData.name}
      />
      <span className={clsx(styles.price, "text text_type_digits-default")}>
        {ingredientData.price}
        <CurrencyIcon type="primary" />
      </span>
      <span className={clsx(styles.name, "text text_type_main-default")}>
        {ingredientData.name}
      </span>
    </li>
  );
}

export default Ingredient;
