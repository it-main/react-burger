import style from "./feed-orders.module.css";
import { clsx } from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../../services/actions/orders";

function FeedOrders(props) {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    dispatch(connect("wss://norma.nomoreparties.space/orders/all"));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  console.log(orders);

  return (
    <section className={clsx(style.orders, "custom-scroll")}>
      {orders.map((order) => {
        return <div>{order.name}</div>;
      })}
    </section>
  );
}

export default FeedOrders;
