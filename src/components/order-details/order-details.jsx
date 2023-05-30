import styles from "./order-details.module.css";
import { clsx } from "clsx";
import done from "../../images/done.svg";
import {useContext} from "react";
import {OrderIdContext} from "../../services/burgerConstructorContext";
function OrderDetails() {
  const orderId = useContext(OrderIdContext);
  return (
    <div className={clsx(styles.orderDetails, "pt-4 pr-25 pb-30 pl-25")}>
      <h2
        className={clsx("text text_type_digits-large mb-8", styles.orderNumber)}
      >
        {orderId.id}
      </h2>
      <span className={clsx("text text_type_main-medium mb-15")}>
        Идентификатор заказа
      </span>
      <img
        className={clsx(styles.done, "mb-15")}
        src={done}
        alt={"Заказ начали готовить"}
      />
      <span className={clsx("text text_type_main-default mb-2")}>
        Ваш заказ начали готовить
      </span>
      <span
        className={clsx(
          "text text_type_main-default text_color_inactive"
        )}
      >
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}

export default OrderDetails;
