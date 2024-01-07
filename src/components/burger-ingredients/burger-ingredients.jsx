import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useEffect, useRef, useState } from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import {
  getStateBurgerConstructor,
  getStateIngredients,
} from "../../utils/constants";

function Tabs({ ingredientsTypes, stateCurrentTab }) {
  const [current, setCurrentTab] = stateCurrentTab;
  const onClickHandler = (currentTab) => {
    setCurrentTab(currentTab);
    const elementHeader = document.getElementById(currentTab);
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
  const { ingredients } = props;
  const selectedIngredients = useSelector(
    getStateBurgerConstructor,
  ).selectedIngredients;
  return (
    <ul className={clsx(styles.ingredientsList, "pl-4 pr-1")}>
      {ingredients.map((ingredientData) => {
        const count = [
          ...selectedIngredients.fillings,
          ...selectedIngredients.bun,
        ].filter((elem) => elem._id === ingredientData._id).length;
        return (
          <BurgerIngredient
            ingredientData={ingredientData}
            count={count}
            // openModalIngredient={props.openModalIngredient}
            key={ingredientData._id}
          />
        );
      })}
    </ul>
  );
}

function IngredientsTypeItem(props) {
  const { ingredientType, stateCurrentTab, refIngredientsTypesList } = props;
  const [, setCurrentTab] = stateCurrentTab;
  const { type, typeRus } = ingredientType;
  const { ref, inView } = useInView({
    threshold: 0,
    root: refIngredientsTypesList.current,
    rootMargin: "0px 0px -85% 0px",
  });

  useEffect(() => {
    if (inView) setCurrentTab(type);
  }, [inView]);

  return (
    <li ref={ref}>
      <h2
        id={type}
        className={
          "text_type_main-medium text mb-6 mt-10 ingredients-type-title"
        }
      >
        {typeRus}
      </h2>
      <IngredientsList ingredients={props.ingredients} type={type} {...props} />
    </li>
  );
}

function IngredientsTypesList(props) {
  const { ingredientsTypes } = props;
  const refIngredientsTypesList = useRef();
  const availableIngredients =
    useSelector(getStateIngredients).availableIngredients;

  return (
    <ul
      ref={refIngredientsTypesList}
      className={clsx(
        styles.ingredientsTypesList,
        "custom-scroll ingredients-types-list",
      )}
    >
      {ingredientsTypes.map((ingredientType, index) => {
        const { type } = ingredientType;
        const ingredients = availableIngredients.filter(
          (elem) => `link-${elem.type}` === type,
        );
        return (
          <IngredientsTypeItem
            refIngredientsTypesList={refIngredientsTypesList}
            ingredientType={ingredientType}
            ingredients={ingredients}
            key={index}
            {...props}
          />
        );
      })}
    </ul>
  );
}

function BurgerIngredients() {
  const ingredientsTypes = [
    { type: "link-bun", typeRus: "Булки" },
    { type: "link-sauce", typeRus: "Соусы" },
    { type: "link-main", typeRus: "Начинки" },
  ];

  const stateCurrentTab = useState("link-bun");

  return (
    <>
      <section className={styles.burgerIngredients}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        <Tabs
          ingredientsTypes={ingredientsTypes}
          stateCurrentTab={stateCurrentTab}
        />
        <IngredientsTypesList
          ingredientsTypes={ingredientsTypes}
          stateCurrentTab={stateCurrentTab}
        />
      </section>
    </>
  );
}

IngredientsTypesList.propTypes = {
  ingredientsTypes: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string, typeRus: PropTypes.string }),
  ).isRequired,
};

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

Tabs.propTypes = {
  ingredientsTypes: PropTypes.arrayOf(
    PropTypes.shape({ type: PropTypes.string, typeRus: PropTypes.string }),
  ).isRequired,
  stateCurrentTab: PropTypes.array.isRequired,
};

export default BurgerIngredients;
