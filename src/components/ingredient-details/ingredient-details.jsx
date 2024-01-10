import styles from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { getStateIngredients } from "../../utils/constants";
import { useParams } from "react-router-dom";

function NutritionalValue({ title, value }) {
  return (
    <div className={styles.nutritionalValue}>
      <span className="text text_type_main-default text_color_inactive">
        {title}
      </span>
      <span className="text text_type_digits-default text_color_inactive">
        {value}
      </span>
    </div>
  );
}

function IngredientDetails() {
  const { ingredientId } = useParams();
  const availableIngredients =
    useSelector(getStateIngredients).availableIngredients;
  const ingredient = availableIngredients.filter(
    (item) => item._id === ingredientId,
  );
  const { name, image, calories, proteins, fat, carbohydrates } =
    ingredient.length ? ingredient[0] : {};
  return (
    <>
      <h1 className={clsx("text text_type_main-large", styles.header)}>
        Детали ингредиента
      </h1>
      <div className={clsx(styles.ingredientDetails, "pl-25 pr-25 pb-5")}>
        <img
          className={clsx(styles.image, "mb-4 pl-5 pr-5")}
          src={image}
          alt={name}
        />
        <h1 className={clsx("text text_type_main-medium mb-8")}>{name}</h1>
        <div className={styles.nutritionalValues}>
          <NutritionalValue title={"Калории,ккал"} value={calories} />
          <NutritionalValue title={"Белки, г"} value={proteins} />
          <NutritionalValue title={"Жиры, г"} value={fat} />
          <NutritionalValue title={"Углеводы, г"} value={carbohydrates} />
        </div>
      </div>
    </>
  );
}

NutritionalValue.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
};

export default IngredientDetails;
