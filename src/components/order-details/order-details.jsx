import styles from "./order-details.module.css";
import { clsx } from "clsx";
import done from "../../images/done.svg";
import { useSelector } from "react-redux";
import { getStateOrder } from "../../utils/constants";
import DownloadStatus from "../download-status/download-status";

function OrderDetails() {
  const { orderNumber, statusOrderNumber } = useSelector(getStateOrder);

  return (
    <div className={clsx(styles.orderDetails, "pt-20 pr-15 pb-20 pl-15")}>
      {!statusOrderNumber ? (
        <DownloadStatus />
      ) : (
        <>
          <p
            className={clsx(
              "text text_type_digits-large mb-8",
              styles.orderNumber,
            )}
          >
            {orderNumber}
          </p>
          <span className="text text_type_main-medium mb-15">
            идентификатор заказа
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
