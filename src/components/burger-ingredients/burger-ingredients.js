import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useEffect, useState } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import { clsx } from "clsx";

function Tabs({ ingredientsTypes }) {
  const [current, setCurrentTab] = useState("bun");
  const onClickHandler = (currentTab) => {
    setCurrentTab(currentTab);
    const elementHeader = document.getElementById(`link-${currentTab}`);
    elementHeader.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.tabs}>
      {ingredientsTypes.map((ingredientType, index) => {
        const { type, typeRus } = ingredientType;
        return (
          <Tab
            value={type}
            active={current === type}
            onClick={onClickHandler}
            key={index}
          >
            {typeRus}
          </Tab>
        );
      })}
    </div>
  );
}

function IngredientsList({ ingredients }) {
  return (
    <ul className={clsx(styles.ingredientsList, "pl-4 pr-1")}>
      {ingredients.map((ingredientData) => {
        return (
          <BurgerIngredient
            ingredientData={ingredientData}
            key={ingredientData._id}
          />
        );
      })}
    </ul>
  );
}

function IngredientsTypesList({ ingredientsTypes, data }) {
  return (
    <ul className={clsx(styles.ingredientsTypesList, "custom-scroll")}>
      {ingredientsTypes.map((ingredientTypes, index) => {
        const { type, typeRus } = ingredientTypes;
        const ingredients = data.filter((elem) => elem.type === type);
        return (
          <li key={index}>
            <h2
              id={`link-${type}`}
              className={"text_type_main-medium text mb-6 mt-10"}
            >
              {typeRus}
            </h2>
            <IngredientsList ingredients={ingredients} />
          </li>
        );
      })}
    </ul>
  );
}

function BurgerIngredients() {
  const ingredientsTypes = [
    { type: "bun", typeRus: "Булки" },
    { type: "sauce", typeRus: "Соусы" },
    { type: "main", typeRus: "Начинки" },
  ];

  const [data, setData] = useState([]);

  const handleSetData = (dataIngredients) => {
    setData(dataIngredients);
  };

  useEffect(() => {
    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then((response) => response.json())
      .then((json) => handleSetData(json.data))
      .catch((error) =>
        console.log(`Ошибка получения данных с сервера ${error}`)
      );
  }, []);

  return (
    <section className={styles.burgerIngredients}>
      <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <Tabs ingredientsTypes={ingredientsTypes} />
      <IngredientsTypesList ingredientsTypes={ingredientsTypes} data={data} />
    </section>
  );
}

export default BurgerIngredients;
