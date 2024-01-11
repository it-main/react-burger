import style from "./feed-orders.module.css";
import { clsx } from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../../services/actions/orders";
import OrderCard from "../order-card/order-card";
import DownloadStatus from "../download-status/download-status";
import { endpoints } from "../../utils/constants";

function FeedOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orders);

  useEffect(() => {
    dispatch(connect(`${endpoints.apiOrders}/all`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  return (
    <section className={clsx(style.orders, "custom-scroll")}>
      {orders.length ? (
        orders.map((order) => {
          return <OrderCard order={order} key={order._id} />;
        })
      ) : (
        <DownloadStatus />
      )}
    </section>
  );
}

export default FeedOrders;
