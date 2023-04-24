import styles from "./ingredient.module.css";
import clsx from "clsx";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
function Ingredient(props) {
  const { image, text, price, extraClass } = props;

  return (
    <li className={clsx(styles.ingredient, extraClass)}>
      <img className={clsx(styles.image)} src={image} alt={text} />
      <span className={clsx(styles.price, "text text_type_digits-default")}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
      <span className={clsx("text_type_main-default")}>{text}</span>
    </li>
  );
}

export default Ingredient;
