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
import { ADD_SELECTED_INGREDIENT } from "../../services/actions/burger-constructor";
import {
  PLACE_ORDER_CLEAR_STATE,
  placeAnOrder,
} from "../../services/actions/order";
import { useDrop } from "react-dnd";
import BurgerConstructorIngredient from "../burger-constructor-ingredient/burger-constructor-ingredient";
import { getStateBurgerConstructor, routes } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/types/hooks";

function BurgerConstructor() {
  //TODO
  const { selectedIngredients } = useSelector(getStateBurgerConstructor) as {
    selectedIngredients: { bun: TIngredient[]; fillings: TIngredient[] };
  };
  //TODO
  const { isAuth } = useSelector((state: any) => state.profile);
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sumSelectedIngredients = useMemo(() => {
    return (
      selectedIngredients.bun.reduce((sum, item) => sum + item.price, 0) +
      selectedIngredients.fillings.reduce((sum, item) => sum + item.price, 0)
    );
  }, [selectedIngredients]);

  const getActionAddIngredient = (item: TIngredient) => {
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
    drop: (item: TIngredient) => {
      dispatch(getActionAddIngredient(item));
    },
  });

  const handlePlaceAnOrder = () => {
    if (isAuth) {
      dispatch(placeAnOrder(selectedIngredients));
      openModal();
    } else {
      navigate(routes.login);
    }
  };

  const handleClosePlaceOrder = () => {
    dispatch({ type: PLACE_ORDER_CLEAR_STATE });
    closeModal();
  };

  const elementBun: TIngredient[] = selectedIngredients.bun;
  const elementsFillings: TIngredient[] = selectedIngredients.fillings;

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
                    type={type.toLowerCase()}
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

        {Boolean(selectedIngredients.bun.length) && (
          <div className={clsx(styles.info)}>
            <span className={clsx("text text_type_digits-medium", styles.sum)}>
              <p className={"text"}>{sumSelectedIngredients}</p>
              <CurrencyIcon type="primary" />
            </span>
            <Button
              htmlType="button"
              type="primary"
              size="large"
              onClick={handlePlaceAnOrder}
            >
              Оформить заказ
            </Button>
          </div>
        )}
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
