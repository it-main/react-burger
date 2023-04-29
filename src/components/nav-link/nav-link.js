import styles from "./nav-link.module.css";
import { clsx } from "clsx";
function NavLink(props) {
  const { Icon, caption, classList } = props;
  return (
    <a className={clsx("pt-4 pb-4", styles.link, classList)}>
      {Icon}
      <span>{caption}</span>
    </a>
  );
}

export default NavLink;
