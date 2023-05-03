import React, { useState } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import styles from "./burger-constructor.module.css";
import { clsx } from "clsx";

const BurgerConstructor = () => {
  const [elements, setElements] = useState([
    data[0],
    // data[1],
    // data[1],
    // data[1],
    // data[1],
    // data[2],
    // data[2],
    data[1],
    data[1],
    data[1],
    data[1],
    data[3],
    data[3],
  ]);
  const [sum, setSum] = useState(0);
  const elementBun = elements.find((elem) => elem.type === "bun");
  const elementsFilling = elements.filter((elem) => elem.type !== "bun");
  // const [elementBun, setElementBun] = useState(null);
  return (
    <section className={clsx(styles.burgerConstructor, "pt-15 pl-4 pr-4")}>
      <ul className={clsx(styles.burgerElements, "mb-10")}>
        {elementBun &&
          ["Top", "Bottom"].map((element) => (
            <li className={clsx(styles[`bun${element}`], "ml-8")}>
              <ConstructorElement
                type={element.toLowerCase()}
                isLocked={true}
                text={elementBun.name}
                price={elementBun.price}
                thumbnail={elementBun.image}
                key={elementBun._id}
              />
            </li>
          ))}
        <li className={styles.burgerFilling}>
          <ul className={clsx(styles.burgerFillingList, "custom-scroll")}>
            {elementsFilling.map((element) => {
              const { name, price, image, _id } = element;
              return (
                <li className={clsx(styles.burgerFillingElement)}>
                  <DragIcon type={"primary"} />
                  <ConstructorElement
                    text={name}
                    price={price}
                    thumbnail={image}
                    key={_id}
                  />
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
      <div className={clsx(styles.info)}>
        <span className={clsx("text text_type_digits-medium", styles.sum)}>
          <p className={"text"}>{sum}</p>
          <CurrencyIcon />
        </span>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};

export default BurgerConstructor;
