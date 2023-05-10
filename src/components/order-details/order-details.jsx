import styles from "./order-details.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function OrderDetails() {
  return (
    <div className={styles.orderAccepted}>
      <CloseIcon type="primary" />
    </div>
  );
}

export default OrderDetails;
