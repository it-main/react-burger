import style from "./order-page.module.css";
import Order from "../components/order/order";

function OrderPage() {
  return (
    <div className={style.content}>
      <Order isPage={true} />
    </div>
  );
}

export default OrderPage;
