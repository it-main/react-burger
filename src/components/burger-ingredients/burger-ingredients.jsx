import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import React, { useState } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { clsx } from "clsx";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";

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

function IngredientsList(props) {
  const { ingredients, selectedIngredients } = props;
  return (
    <ul className={clsx(styles.ingredientsList, "pl-4 pr-1")}>
      {ingredients.map((ingredientData) => {
        const count =  selectedIngredients.filter(elem => elem._id === ingredientData._id).length;
        return (
          <BurgerIngredient
            ingredientData={ingredientData}
            {...props}
            count={count}
            key={ingredientData._id}
          />
        );
      })}
    </ul>
  );
}

function IngredientsTypesList(props) {
  const { ingredientsTypes, availableIngredients } = props;
  return (
    <ul className={clsx(styles.ingredientsTypesList, "custom-scroll")}>
      {ingredientsTypes.map((ingredientTypes, index) => {
        const { type, typeRus } = ingredientTypes;
        const ingredients = availableIngredients.filter((elem) => elem.type === type);
        return (
          <li key={index}>
            <h2
              id={`link-${type}`}
              className={"text_type_main-medium text mb-6 mt-10"}
            >
              {typeRus}
            </h2>
            <IngredientsList ingredients={ingredients} {...props} />
          </li>
        );
      })}
    </ul>
  );
}

function BurgerIngredients(props) {

  const ingredientsTypes = [
    { type: "bun", typeRus: "Булки" },
    { type: "sauce", typeRus: "Соусы" },
    { type: "main", typeRus: "Начинки" },
  ];
  const [dataIngredientDetails, setDataIngredientDetails] = useState({active: false});
  const setActiveIngredientDetails = (active) => {
    setDataIngredientDetails(active ? {...dataIngredientDetails, active} : {active: false})
  }

  return (
    <>
    <section className={styles.burgerIngredients}>
      <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <Tabs ingredientsTypes={ingredientsTypes} />
      <IngredientsTypesList ingredientsTypes={ingredientsTypes} setDataIngredientDetails={setDataIngredientDetails} {...props}/>
    </section>
    {dataIngredientDetails.active &&
      (<Modal header={"Детали ингредиента"} setActive={setActiveIngredientDetails}>
        <IngredientDetails {...dataIngredientDetails}/>
      </Modal>)
    }
    </>
  );
}

BurgerIngredients.propTypes = {
  availableIngredients: PropTypes.arrayOf(ingredientPropType),
  selectedIngredients: PropTypes.arrayOf(ingredientPropType),
}

export default BurgerIngredients;
