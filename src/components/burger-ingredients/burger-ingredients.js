import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useState } from "react";
import Ingredient from "../ingredient/ingredient";
import data from "../../utils/data";

function Tabs({ ingredientsTypes }) {
  const [current, setCurrentTab] = useState(0);
  return (
    <div className={`mb-10 ${styles.tabs}`}>
      {ingredientsTypes.map((ingredientType, index) => {
        return (
          <Tab
            value={index}
            active={current === index}
            onClick={setCurrentTab}
            key={index}
          >
            {ingredientType.typeRus}
          </Tab>
        );
      })}
    </div>
  );
}

function Ingredients({ ingredientsTypes }) {
  return ingredientsTypes.map((ingredientTypes, index) => {
    return (
      <li className={styles.ingredientTypeItem} key={index}>
        <h2 className={"text_type_main-medium text mb-6"}>
          {ingredientTypes.typeRus}
        </h2>
        <ul className={styles.ingredientsGroup + " pl-4 pr-4"}>
          {data.map((ingredientData) => {
            return (
              ingredientData.type === ingredientTypes.type && (
                <Ingredient
                  ingredientData={ingredientData}
                  key={ingredientData._id}
                />
              )
            );
          })}
        </ul>
      </li>
    );
  });
}

function BurgerIngredients() {
  const ingredientsTypes = [
    { type: "bun", typeRus: "Булки" },
    { type: "sauce", typeRus: "Соусы" },
    { type: "main", typeRus: "Начинки" },
  ];
  return (
    <section className={styles.burgerIngredients}>
      <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <Tabs ingredientsTypes={ingredientsTypes} />
      <ul className={styles.ingredientsTypesList}>
        <Ingredients ingredientsTypes={ingredientsTypes} />
      </ul>
    </section>
  );
}
export default BurgerIngredients;