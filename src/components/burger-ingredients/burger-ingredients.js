import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";
import { useState } from "react";
import Ingredient from "../ingredient/ingredient";
import data from "../../utils/data";
function BurgerIngredients() {
  const [current, setCurrent] = useState("one");
  return (
    <section>
      {/*className={styles.ingredients}>*/}
      <h1 className={`mb-5 text text_type_main-large`}>Соберите бургер</h1>
      <div className={`mb-10 ${styles.tabs}`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <h2 className={"text_type_main-medium text mb-6"}>Булки</h2>
      <ul className={styles.ingredientsList + " pl-4 pr-4"}>
        {data.map(
          (item) =>
            item.type === "bun" && (
              <Ingredient
                image={item.image}
                price={item.price}
                text={item.name}
                id={item._id}
              />
            )
        )}
      </ul>
    </section>
  );
}
export default BurgerIngredients;
