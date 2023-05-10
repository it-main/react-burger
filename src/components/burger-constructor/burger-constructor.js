import React, { useState, useEffect } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./burger-constructor.module.css";
import { clsx } from "clsx";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function BurgerConstructor({ data }) {
  const [elements, setElements] = useState([
    data[0],
    data[1],
    data[2],
    data[3],
    data[4],
    data[5],
    data[6],
  ]);

  const [sum, setSum] = useState(0);
  const [activeOrderDetails, setActiveOrderDetails] = useState(false);

  const handleSetSum = (newSum) => {
    setSum(newSum);
  };

  useEffect(() => {
    let newSum = 0;
    elements.forEach((elem) => {
      newSum += elem.price;
    });
    handleSetSum(newSum);
  }, [elements]);

  const handlePlaceOrder = () => {
    setActiveOrderDetails(true);
  };

  const elementBun = elements.find((elem) => elem.type === "bun");
  const elementsFilling = elements.filter((elem) => elem.type !== "bun");

  return (
    <section className={clsx(styles.burgerConstructor, "pt-15")}>
      <div className={clsx(styles.burgerElements)}>
        {elementBun &&
          ["Top", "Bottom"].map((element) => {
            const uuid = crypto.randomUUID();
            return (
              <div
                className={clsx(styles[`bun${element}`], styles.bun)}
                key={uuid}
              >
                <ConstructorElement
                  type={element.toLowerCase()}
                  isLocked={true}
                  text={elementBun.name}
                  price={elementBun.price}
                  thumbnail={elementBun.image}
                />
              </div>
            );
          })}

        <ul className={clsx(styles.burgerFillingList, "custom-scroll")}>
          {elementsFilling.map((element) => {
            const { name, price, image } = element;
            const uuid = crypto.randomUUID();
            return (
              <li
                className={clsx(styles.burgerFillingElement, "ml-4")}
                key={uuid}
              >
                <DragIcon type={"primary"} />
                <ConstructorElement
                  text={name}
                  price={price}
                  thumbnail={image}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={clsx(styles.info)}>
        <span className={clsx("text text_type_digits-medium", styles.sum)}>
          <p className={"text"}>{sum}</p>
          <CurrencyIcon />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={handlePlaceOrder}
        >
          Оформить заказ
        </Button>
      </div>
      <Modal active={activeOrderDetails}>
        <OrderDetails />
      </Modal>
    </section>
  );
}

export default BurgerConstructor;
