import styles from "./ingredient-details.module.css";
import { clsx } from "clsx";
import { getStateIngredients } from "../../utils/constants";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/types/hooks";

type PropsNutritionalValue = { title: string; value: number };

function NutritionalValue({ title, value }: PropsNutritionalValue) {
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
  const ingredient = availableIngredients.find(
    (item) => item._id === ingredientId,
  );
  const { name, image, calories, proteins, fat, carbohydrates } =
    ingredient as TIngredient;
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

export default IngredientDetails;
