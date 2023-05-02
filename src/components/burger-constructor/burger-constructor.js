import React, { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import styles from "./burger-constructor.module.css";
import { clsx } from "clsx";

const BurgerConstructor = () => {
  const [elements, setElements] = useState([
    data[0],
    data[1],
    // data[1],
    // data[1],
    data[1],
    data[2],
    data[1],
    data[3],
  ]);
  const elementBun = elements.find((elem) => elem.type === "bun");
  const elementsFilling = elements.filter((elem) => elem.type !== "bun");
  // const [elementBun, setElementBun] = useState(null);
  return (
    <section className={clsx(styles.burgerConstructor, "pt-15 pl-4 pr-4")}>
      <ul className={styles.burgerElements}>
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
        <li>
          <ul className={clsx(styles.burgerFilling, "custom-scroll")}>
            {elementsFilling.map((element) => {
              const { name, price, image, _id } = element;
              return (
                <li className={clsx(styles.burgerElement)}>
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
    </section>
  );
};

export default BurgerConstructor;
