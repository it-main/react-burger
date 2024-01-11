import { useDispatch, useSelector } from "react-redux";
import { clsx } from "clsx";
import style from "./profile-orders.module.css";
import OrderCard from "../order-card/order-card";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/actions/orders-profile";
import DownloadStatus from "../download-status/download-status";
import { getToken } from "../../utils/order";
import { accessToken, endpoints } from "../../utils/constants";

function ProfileOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.ordersProfile);
  useEffect(() => {
    dispatch(connect(`${endpoints.apiOrders}?token=${getToken(accessToken)}`));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  if (!orders?.length) return <DownloadStatus />;

  return (
    <section className={clsx(style.orders, "custom-scroll")}>
      {[...orders].reverse().map((order) => (
        <OrderCard order={order} key={order._id} orderStatusVisible={true} />
      ))}
    </section>
  );
}

export default ProfileOrders;
