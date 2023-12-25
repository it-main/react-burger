import React, { useMemo } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { clsx } from "clsx";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import { useModal } from "../../hooks/useModal";
import { useDispatch, useSelector } from "react-redux";
import { ADD_SELECTED_INGREDIENT } from "../../services/actions/burger-constructor";
import { getOrderNumber } from "../../services/actions/order";
import { useDrop } from "react-dnd";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { CLOSE_PLACE_ORDER } from "../../services/actions/order";
import { getStateBurgerConstructor } from "../../utils/constants";
import { checkResponse, getUserRequest, loginRequest } from "../../utils/api";

function BurgerConstructor() {
  const { selectedIngredients } = useSelector(getStateBurgerConstructor);
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const sumSelectedIngredients = useMemo(() => {
    return (
      selectedIngredients.bun.reduce((sum, item) => sum + item.price * 2, 0) +
      selectedIngredients.fillings.reduce((sum, item) => sum + item.price, 0)
    );
  }, [selectedIngredients]);

  const getActionAddIngredient = (item) => {
    const payload =
      item.type === "bun"
        ? [
            { ingredient: item, id: crypto.randomUUID() },
            { ingredient: item, id: crypto.randomUUID() },
          ]
        : [{ ingredient: item, id: crypto.randomUUID() }];
    return {
      type: ADD_SELECTED_INGREDIENT,
      payload,
    };
  };

  const [, targetRef] = useDrop({
    accept: "ingredient",
    drop: (item) => {
      dispatch(getActionAddIngredient(item));
    },
  });

  const handleGetOrderNumber = () => {
    if (
      (!selectedIngredients.bun.length &&
        !selectedIngredients.fillings.length) ||
      !selectedIngredients.bun.length
    )
      return undefined;
    dispatch(getOrderNumber(selectedIngredients));
    openModal();
  };

  const handleClosePlaceOrder = () => {
    dispatch({ type: CLOSE_PLACE_ORDER });
    closeModal();
  };

  const elementBun = selectedIngredients.bun;
  const elementsFillings = selectedIngredients.fillings;

  function InvitationChoose() {
    let invitationChoose;
    if (!elementBun.length && !elementsFillings.length)
      invitationChoose = "Соберите свой бургер!";
    else if (!elementsFillings.length) invitationChoose = "Выбирайте начинку!";
    else if (!elementBun.length) invitationChoose = "Выбирайте булку!";
    return (
      invitationChoose && (
        <p
          className={clsx(
            "text text_type_main-large mt-4",
            styles.invitationChoose,
          )}
        >
          {invitationChoose}
        </p>
      )
    );
  }

  return (
    <>
      <section className={clsx(styles.burgerConstructor, "pt-15")}>
        <div className={clsx(styles.burgerElements)} ref={targetRef}>
          {elementBun &&
            elementBun.map((element, index) => {
              const { name, price, image } = element;
              const type = index === 0 ? "Top" : "Bottom";
              return (
                <div
                  className={clsx(styles[`bun${type}`], styles.bun)}
                  key={element.id}
                >
                  <ConstructorElement
                    type
                    isLocked={true}
                    text={name + ` ${type === "Top" ? "(верх)" : "(низ)"}`}
                    price={price}
                    thumbnail={image}
                  />
                </div>
              );
            })}
          <InvitationChoose />
          <ul className={clsx(styles.burgerFillingList, "custom-scroll")}>
            {elementsFillings.map((element, index) => {
              return (
                <BurgerConstructorIngredient
                  element={element}
                  index={index}
                  key={element.id}
                />
              );
            })}
          </ul>
        </div>

        <div className={clsx(styles.info)}>
          <span className={clsx("text text_type_digits-medium", styles.sum)}>
            <p className={"text"}>{sumSelectedIngredients}</p>
            <CurrencyIcon type="primary" />
          </span>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleGetOrderNumber}
          >
            Оформить заказ
          </Button>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            // onClick={async () => {
            //   async function send(email, pass) {
            //     return await loginRequest(email, pass)
            //       .then(checkResponse)
            //       .catch((err) => err);
            //   }
            //
            //   console.log("Отправляем запрос");
            //   const rez = await send("", "");
            //   console.log("Promise: ", rez);
            //   rez.then((r) => {
            //     console.log("Результат4: ", r);
            //   });
            //   console.log("end");
            // }}
            onClick={() => {
              getUserRequest()
                .then((json) => console.log("JSON ", json))
                .catch((err) => console.log("ERRR", err));
            }}
          >
            ТЕСТ
          </Button>
        </div>
      </section>
      {isModalOpen && (
        <Modal closeModal={handleClosePlaceOrder}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
