import style from "./feed-stat.module.css";
import { clsx } from "clsx";
import { RootState } from "../../services/types";
import { useSelector } from "../../services/types/hooks";

function FeedStat() {
  const { total, totalToday, orders } = useSelector(
    (store: RootState) => store.orders,
  );

  function ListOrders({ statusDone = true }) {
    let count = 0;
    return (
      <>
        {orders.map((order) => {
          const styleOrderNumber =
            order.status === "done" ? style.orderNumberDone : style.number;
          if (
            count < 10 &&
            ((statusDone && order.status === "done") ||
              (!statusDone && order.status !== "done"))
          ) {
            count++;
            return (
              <li
                className={`${styleOrderNumber} text text_type_digits-default mb-2`}
                key={order._id}
              >
                {order.number}
              </li>
            );
          }
        })}
      </>
    );
  }

  return (
    <section className={clsx(style.statistics, "custom-scroll")}>
      <div className={clsx(style.ordersStatuses, "mb-15")}>
        <div className={style.ordersStatus}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={style.listOrders}>
            <ListOrders statusDone />
          </ul>
        </div>

        <div className={style.ordersStatus}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={style.listOrders}>
            <ListOrders statusDone={false} />
          </ul>
        </div>
      </div>

      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <p className={`${style.ordersCount} text text_type_digits-large mb-15`}>
        {total}
      </p>

      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <p className={`${style.ordersCount} text text_type_digits-large`}>
        {totalToday}
      </p>
    </section>
  );
}
export default FeedStat;
