import styles from "./order-details.module.css";
import { clsx } from "clsx";
import done from "../../images/done.svg";
import { useSelector } from "react-redux";
import { getStateOrder } from "../../utils/constants";

function OrderDetails() {
  const { orderNumber, statusOrderNumber } = useSelector(getStateOrder);

  return (
    <div className={clsx(styles.orderDetails, "pt-4 pr-25 pb-30 pl-25")}>
      {!statusOrderNumber ? (
        <h1 className="text text_type_main-medium mb-15"> Загрузка...</h1>
      ) : (
        <>
          <h2
            className={clsx(
              "text text_type_digits-large mb-8",
              styles.orderNumber,
            )}
          >
            {orderNumber}
          </h2>
          <span className="text text_type_main-medium mb-15">
            Идентификатор заказа
          </span>
          <img
            className={clsx(styles.done, "mb-15")}
            src={done}
            alt={"Заказ начали готовить"}
          />
          <span className="text text_type_main-default mb-2">
            Ваш заказ начали готовить
          </span>
          <span className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </span>
        </>
      )}
    </div>
  );
}
export default OrderDetails;
