import { Link, useLocation } from "react-router-dom";
import style from "./order-card.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import { useSelector } from "react-redux";

import {
  burgerPrice,
  orderIngredientsNormalised,
  orderStatus,
} from "../../utils/order";

function OrderCard({ order, orderStatusVisible = false }) {
  const availableIngredients = useSelector(
    (state) => state.ingredients.availableIngredients,
  );
  const location = useLocation();
  const ingredients = orderIngredientsNormalised(order.ingredients).map(
    (ingredient) =>
      availableIngredients.find((item) => item._id === ingredient),
  );
  const ingredientsCount = ingredients.length;
  const ingredientPlusCount = Math.max(0, ingredientsCount - 6);

  const displayedIngredients = ingredients.slice(
    0,
    Math.min(6, ingredientsCount),
  );

  const price = burgerPrice(ingredients);

  function Ingredient({ index, ingredient }) {
    return (
      <li
        key={index}
        className={clsx(
          style.ingredient,
          ingredientPlusCount && index === 0 && style.ingredientPlusBackground,
        )}
      >
        <img
          src={ingredient?.image}
          alt={ingredient?.name}
          className={style.image}
        />
        {ingredientPlusCount && index === 0 && (
          <span className={style.ingredientsPlus}>
            {`+${ingredientPlusCount}`}
          </span>
        )}
      </li>
    );
  }

  return (
    <article className={clsx(style.order, "mb-4 mr-2")}>
      <Link
        className={style.link}
        to={`${order.number}`}
        state={{ background: location }}
      >
        <div className={style.header}>
          <span className={clsx("text_type_digits-default text")}>
            {`#${order.number}`}
          </span>
          <FormattedDate
            className={"text_type_main-default text_color_inactive text"}
            date={new Date(order.createdAt)}
          />
        </div>

        <h2 className="text text_type_main-medium mb-2">{order.name}</h2>

        {orderStatusVisible && (
          <p
            className={clsx(
              "text text_type_main-default",
              order.status === "done" ? style.orderDone : "",
            )}
          >
            {orderStatus[order.status]}
          </p>
        )}

        <div className={style.footer}>
          <ul className={style.ingredientsList}>
            {displayedIngredients.map((ingredient, index) => (
              <Ingredient index={index} ingredient={ingredient} key={index} />
            ))}
          </ul>
          <div className={`${style.price} ml-6`}>
            <p className="text text_type_digits-default mr-2">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default OrderCard;
