import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  burgerPrice,
  orderIngredientsNormalised,
  orderStatus,
} from "../../utils/order";
import { clsx } from "clsx";
import style from "./order.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import DownloadStatus from "../download-status/download-status";
import { sendRequestGetOrder } from "../../utils/api";

function Order({ isPage = false }) {
  const { orderNum } = useParams();

  const { orders } = useSelector((state) => state.orders);

  let [order, setOrder] = useState(
    orders.find((item) => item.number.toString() === orderNum),
  );

  const availableIngredients = useSelector(
    (state) => state.ingredients.availableIngredients,
  );

  useEffect(() => {
    if (!order)
      sendRequestGetOrder(orderNum).then((json) => setOrder(json.orders[0]));
  }, []);

  if (!order || !availableIngredients.length) {
    return <DownloadStatus />;
  }

  const ingredients = orderIngredientsNormalised(order.ingredients).map(
    (ingredient) => {
      return availableIngredients.find((item) => item._id === ingredient);
    },
  );

  const uniqueIngredients = Array.from(new Set(ingredients));

  const price = burgerPrice(ingredients);

  return (
    <div className={isPage ? style.orderPage : ""}>
      <h2
        className={clsx(
          "text text_type_digits-default mb-5",
          style.header,
          isPage ? style.headerPage : "",
        )}
      >
        {`#${order.number}`}
      </h2>
      <p className="text text_type_main-medium mb-3">{order.name}</p>
      <p
        className={clsx(
          "text text_type_main-default mb-15",
          order.status === "done" ? style.orderDone : "",
        )}
      >
        {orderStatus[order.status]}
      </p>
      <h3 className={`text text_type_main-medium mb-6`}>Состав:</h3>
      <ul className={clsx(style.ingredientList, "custom-scroll")}>
        {uniqueIngredients.map((ingredient, index) => {
          const count = ingredients.filter(
            (item) => item._id === ingredient._id,
          ).length;
          return (
            <li className={clsx(style.ingredientItem)} key={index}>
              <div className={style.imageBorder}>
                <img
                  className={style.image}
                  src={ingredient.image}
                  alt={ingredient.name}
                />
              </div>
              <p
                className={clsx(
                  "text text_type_main-default",
                  style.ingredientName,
                )}
              >
                {ingredient.name}
              </p>
              <div className={clsx(style.ingredientPrice)}>
                <p
                  className={clsx(style.price, "text text_type_digits-default")}
                >
                  {`${count} x ${ingredient.price}`}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={style.footer}>
        <FormattedDate
          date={new Date(order.createdAt)}
          className="text text_type_main-default text_color_inactive"
        />
        <div className={`${style.price} ml-6`}>
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default Order;
