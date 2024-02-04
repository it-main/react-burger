import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { clsx } from "clsx";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import {
  getStateBurgerConstructor,
  getStateIngredients,
} from "../../utils/constants";
import DownloadStatus from "../download-status/download-status";

type TitleTab = { type: string; title: string };

type TabsProps = {
  ingredientsTypes: TitleTab[];
  stateCurrentTab: [string, Dispatch<SetStateAction<string>>];
};

function Tabs(props: TabsProps) {
  const { ingredientsTypes, stateCurrentTab } = props;
  const [current, setCurrentTab] = stateCurrentTab;
  const onClickHandler = (currentTab: string) => {
    setCurrentTab(currentTab);
    const elementHeader = document.getElementById(currentTab);
    elementHeader?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={styles.tabs}>
      {ingredientsTypes.map((ingredientType, index) => {
        const { type, title } = ingredientType;
        return (
          <Tab
            value={type}
            active={current === type}
            onClick={onClickHandler}
            key={index}
          >
            {title}
          </Tab>
        );
      })}
    </div>
  );
}

function IngredientsList({ ingredients }: { ingredients: TIngredient[] }) {
  const selectedIngredients: { fillings: TIngredient[]; bun: TIngredient[] } =
    useSelector(getStateBurgerConstructor).selectedIngredients;
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
            key={ingredientData._id}
          />
        );
      })}
    </ul>
  );
}

type IngredientsTypeItemProps = {
  ingredientType: TitleTab;
  refIngredientsTypesList: RefObject<HTMLUListElement>;
  ingredients: TIngredient[];
};

function IngredientsTypeItem(props: TabsProps & IngredientsTypeItemProps) {
  const { ingredientType, stateCurrentTab, refIngredientsTypesList } = props;
  const [, setCurrentTab] = stateCurrentTab;
  const { type, title } = ingredientType;
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
        {title}
      </h2>
      {/*<IngredientsList ingredients={props.ingredients} type={type} {...props} />*/}
      <IngredientsList ingredients={props.ingredients} />
    </li>
  );
}

function IngredientsTypesList(props: TabsProps) {
  const { ingredientsTypes } = props,
    refIngredientsTypesList = useRef<HTMLUListElement>(null),
    availableIngredients =
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
          //TODO
          (elem: any) => `link-${elem.type}` === type,
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
    { type: "link-bun", title: "Булки" },
    { type: "link-sauce", title: "Соусы" },
    { type: "link-main", title: "Начинки" },
  ];
  const statusAvailableIngredients =
    useSelector(getStateIngredients).statusAvailableIngredients;

  const stateCurrentTab = useState("link-bun");

  return (
    <>
      <section className={styles.burgerIngredients}>
        <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
        {statusAvailableIngredients ? (
          <>
            <Tabs
              ingredientsTypes={ingredientsTypes}
              stateCurrentTab={stateCurrentTab}
            />
            <IngredientsTypesList
              ingredientsTypes={ingredientsTypes}
              stateCurrentTab={stateCurrentTab}
            />
          </>
        ) : (
          <DownloadStatus />
        )}
      </section>
    </>
  );
}

export default BurgerIngredients;
