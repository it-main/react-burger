import { clsx } from "clsx";
import styles from "../pages/ingredient.module.css";
import IngredientDetails from "../components/ingredient-details/ingredient-details";

function Ingredient() {
  return (
    <>
      <h2
        className={clsx(
          "text text_type_main-large pt-10 pl-10 pr-10",
          styles.header,
        )}
      >
        Детали ингредиента
      </h2>
      <IngredientDetails />
    </>
  );
}

export default Ingredient;
