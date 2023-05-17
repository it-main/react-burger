import styles from "./ingredient-details.module.css"
import {clsx} from "clsx";
import {ingredientPropType} from "../../utils/prop-types";
import PropTypes from "prop-types";

function NutritionalValue({title, value}) {
  return (
  <div className={styles.nutritionalValue}>
    <span className="text text_type_main-default text_color_inactive">{title}</span>
    <span className="text text_type_digits-default text_color_inactive">{value}</span>
  </div>
  )
}

function IngredientDetails({ingredient}) {
  const {name, image, calories, proteins, fat, carbohydrates} = ingredient;

  return (
    <div className={clsx(styles.ingredientDetails, "pl-25 pr-25 pb-15")}>
      <img className={clsx(styles.image, "mb-4 pl-5 pr-5")} src={image} alt={name}/>
      <h1 className="text text_type_main-medium mb-8">{name}</h1>
      <div className={styles.nutritionalValues}>
        <NutritionalValue title={"Калории,ккал"} value={calories}/>
        <NutritionalValue title={"Белки, г"} value={proteins}/>
        <NutritionalValue title={"Жиры, г"} value={fat}/>
        <NutritionalValue title={"Углеводы, г"} value={carbohydrates}/>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType
}

NutritionalValue.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
}


export default IngredientDetails;