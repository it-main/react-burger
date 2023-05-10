import styles from "./burger-ingredient.module.css";
import clsx from "clsx";
import { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
function BurgerIngredient({ ingredientData, handleSetActiveModal }) {
  const [count, setCount] = useState(0);
  return (
    <article
      className={clsx(styles.ingredient)}
      onClick={() => handleSetActiveModal({ ...ingredientData })}
    >
      {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
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
    </article>
  );
}

export default BurgerIngredient;
