import style from "./feed-stat.module.css";
import { clsx } from "clsx";

function FeedStat(props) {
  return (
    <section className={clsx(style.statuses, "custom-scroll")}>
      Статистика
    </section>
  );
}
export default FeedStat;
