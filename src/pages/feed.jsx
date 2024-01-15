import style from "./feed.module.css";
import FeedOrders from "../components/feed-orders/feed-orders";
import FeedStat from "../components/feed-stat/feed-stat";

function Feed(props) {
  return (
    <main>
      <h1 className={`mb-5 mt-10 text text_type_main-large`}>Лента заказов</h1>
      <div className={style.content}>
        <FeedOrders />
        <FeedStat />
      </div>
    </main>
  );
}

export default Feed;
