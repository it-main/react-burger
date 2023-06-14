import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import React, {useContext, useState} from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { clsx } from "clsx";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
import {ingredientPropType} from "../../utils/prop-types";
import {useModal} from "../../hooks/useModal";
import {SelectedIngredientsContext} from "../../services/selected-ingredients-context";
import {useDispatch, useSelector} from "react-redux";
import {ADD_INGREDIENT_DETAILS, DELETE_INGREDIENT_DETAILS} from "../../services/actions/ingredients";

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
  const { ingredients } = props;
  //const [ selectedIngredients ] = useContext(SelectedIngredientsContext).selectedIngredientsState;
  const selectedIngredients = useSelector(state => state.ingredients.selectedIngredients);

  return (
    <ul className={clsx(styles.ingredientsList, "pl-4 pr-1")}>
      {ingredients.map((ingredientData) => {
        const count = [...selectedIngredients.fillings, ...selectedIngredients.bun].filter(elem => elem._id === ingredientData._id).length;
        return (
          <BurgerIngredient
            ingredientData={ingredientData}
            count={count}
            openModalIngredient={props.openModalIngredient}
            key={ingredientData._id}
          />
        );
      })}
    </ul>
  );
}

function IngredientsTypesList(props) {
  const { ingredientsTypes } = props;
  const availableIngredients = useSelector(state => state.ingredients.availableIngredients);
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

function BurgerIngredients() {

  const ingredientsTypes = [
    { type: "bun", typeRus: "Булки" },
    { type: "sauce", typeRus: "Соусы" },
    { type: "main", typeRus: "Начинки" },
  ];

  const dispatch = useDispatch();

  //const [ingredient, setIngredient] = useState(undefined);

  const { isModalOpen, openModal, closeModal } = useModal();

  const openModalIngredient = (ingredientDetails) => {
    //setIngredient(ingredientDetails);
    dispatch({type: ADD_INGREDIENT_DETAILS, payload: ingredientDetails})
    openModal();
  }
  const closeModalIngredient = () => {
    dispatch({type: DELETE_INGREDIENT_DETAILS});
    closeModal();
  }

  return (
    <>
    <section className={styles.burgerIngredients}>
      <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <Tabs ingredientsTypes={ingredientsTypes} />
      <IngredientsTypesList ingredientsTypes={ingredientsTypes} openModalIngredient={openModalIngredient}/>
    </section>
    {isModalOpen &&
      (<Modal header={"Детали ингредиента"} closeModal={closeModalIngredient}>
        <IngredientDetails/>
      </Modal>)
    }
    </>
  );
}

// TODO
BurgerIngredients.propTypes = {
//  availableIngredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

IngredientsTypesList.propTypes = {
//  ingredientsTypes: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string, typeRus: PropTypes.string})).isRequired,
//  availableIngredients: PropTypes.arrayOf(ingredientPropType).isRequired,
//  openModalIngredient: PropTypes.func.isRequired,
};

IngredientsList.propTypes = {
//  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
};

Tabs.propTypes = {
//  ingredientsTypes: PropTypes.arrayOf(PropTypes.shape({type: PropTypes.string, typeRus: PropTypes.string})).isRequired,
};


export default BurgerIngredients;
