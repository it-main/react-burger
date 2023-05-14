import styles from "./burger-ingredient.module.css";
import clsx from "clsx";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

function BurgerIngredient(props) {
  const { ingredientData, setDataIngredientDetails, count } = props;
  return (
    <article className={styles.ingredient} onClick={() => setDataIngredientDetails({data: ingredientData, active: true})}>
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
  setDataIngredientDetails: PropTypes.func,
  count: PropTypes.number,
};

export default BurgerIngredient;