import React, {useState, useEffect, useContext, useReducer} from "react";
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
import {useModal} from "../../hooks/useModal";
import {SelectedIngredientsContext} from "../../services/appContext";
import {OrderIdContext} from "../../services/burgerConstructorContext";
import {checkResponse, sendRequest} from "../../utils/api";

function BurgerConstructor() {

  const { isModalOpen, openModal, closeModal } = useModal();
  const [selectedIngredients] = useContext(SelectedIngredientsContext).selectedIngredientsState;
  const sumIngredients = useContext(SelectedIngredientsContext).sumIngredients;
  const [orderId, setOrderId] = useState({});

  const handlePlaceOrder = () => {
    const requestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ingredients: [...selectedIngredients.bun, ...selectedIngredients.fillings].map(elem => elem._id)}),
    }

    sendRequest('orders', requestInit)
      .then(checkResponse)
      .then(json => {
        if (json.success) {
          setOrderId({id:json.order.number});
          openModal();
        } else {
          console.log("Произошла ошибка, попробуйте еще раз");
        }
      })
      .catch(error => {
        console.log(`Ошибка при загрузке данных с сервера ${error}`);
      });
  };

  const elementBun = selectedIngredients.bun[0];
  const elementsFillings = selectedIngredients.fillings;

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
          {elementsFillings.map((element, index) => {
            const { name, price, image, _id } = element;
            return (
              <li
                className={clsx(styles.burgerFillingElement, "ml-4")}
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
          <p className={"text"}>{sumIngredients.price}</p>
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
    {isModalOpen && (
      <Modal closeModal={closeModal}>
        <OrderIdContext.Provider value={orderId}>
          <OrderDetails />
        </OrderIdContext.Provider>
      </Modal>)}
  </>
  );
}

export default BurgerConstructor;
