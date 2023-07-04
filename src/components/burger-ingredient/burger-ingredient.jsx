import styles from "./burger-ingredient.module.css";
import clsx from "clsx";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {useDrag} from "react-dnd";

function BurgerIngredient(props) {
  const { ingredientData, count, openModalIngredient } = props;

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredientData
  });

  return (
    <article
      className={styles.ingredient}
      onClick={() => openModalIngredient(ingredientData)}
      ref={dragRef}
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

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  openModalIngredient: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default BurgerIngredient;
