import styles from "./burger-ingredient.module.css";
import clsx from "clsx";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";

type PropsBurgerIngredient = {
  ingredientData: TIngredient;
  count: number;
};

function BurgerIngredient(props: PropsBurgerIngredient) {
  const { ingredientData, count } = props;
  const location = useLocation();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData,
  });
  return (
    <Link
      to={`/ingredients/${ingredientData._id}`}
      state={{ background: location }}
      className={styles.ingredientLink}
    >
      <article className={styles.ingredient} ref={dragRef}>
        {count > 0 && <Counter count={count} size="default" extraClass="m-1" />}
        <img
          className={clsx(styles.image)}
          src={ingredientData.image}
          alt={ingredientData.name}
        />
        <span
          className={clsx(
            styles.price,
            "text text_type_digits-default text_color_primary",
          )}
        >
          {ingredientData.price}
          <CurrencyIcon type="primary" />
        </span>
        <span
          className={clsx(
            styles.name,
            "text text_type_main-default text_color_primary",
          )}
        >
          {ingredientData.name}
        </span>
      </article>
    </Link>
  );
}

export default BurgerIngredient;
