import React, { useState, useEffect } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { clsx } from "clsx";
import PropTypes from "prop-types";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {ingredientPropType} from "../../utils/prop-types";
import {useModal} from "../../hooks/useModal";

function BurgerConstructor(props) {
  const { selectedIngredients } = props;
  const [sum, setSum] = useState(0);
  const { isModalOpen, openModal, closeModal } = useModal();
  const handleSetSum = (newSum) => {
    setSum(newSum);
  };

  useEffect(() => {
    let newSum = 0;
    selectedIngredients.forEach((elem) => {
      newSum += elem.price;
    });
    handleSetSum(newSum);
  }, [selectedIngredients]);

  const handlePlaceOrder = () => {
    openModal();
  };

  const elementBun = selectedIngredients.find((elem) => elem.type === "bun");
  const elementsFilling = selectedIngredients.filter((elem) => elem.type !== "bun");

  return (
    <>
    <section className={clsx(styles.burgerConstructor, "pt-15")}>
      <div className={clsx(styles.burgerElements)}>
        {elementBun &&
          ["Top", "Bottom"].map((element, index) => {
            const {name, price, image, _id} = elementBun;
            return (
              <div
                className={clsx(styles[`bun${element}`], styles.bun)}
                //т.к. булки 2шт, _id использовать не получилось
                key={_id+index.toString()}
              >
                <ConstructorElement
                  type={element.toLowerCase()}
                  isLocked={true}
                  text={name + ` ${element==="Top" ? "(верх)" : "(низ)"}`}
                  price={price}
                  thumbnail={image}
                />
              </div>
            );
          })}

        <ul className={clsx(styles.burgerFillingList, "custom-scroll")}>
          {elementsFilling.map((element, index) => {
            const { name, price, image, _id } = element;
            return (
              <li
                className={clsx(styles.burgerFillingElement, "ml-4")}
                //элементы могут повторяться, _id использовать не получилось
                key={_id+index.toString()}
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
          <CurrencyIcon type="primary"/>
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
    </section>
    {isModalOpen && (<Modal closeModal={closeModal}> <OrderDetails /> </Modal>)}
  </>
  );
}

BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor;
