import IngredientDetails from "../components/ingredient-details/ingredient-details";
import style from "./ingredient.module.css";

function Ingredient() {
  return (
    <div className={style.wrapper}>
      <IngredientDetails />
    </div>
  );
}

export default Ingredient;
