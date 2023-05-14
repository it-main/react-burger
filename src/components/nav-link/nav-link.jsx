import styles from "./nav-link.module.css";
import { clsx } from "clsx";
import PropTypes from "prop-types";
function NavLink(props) {
  const { children, caption, classList } = props;
  return (
    <a className={clsx("pt-4 pb-4", styles.link, classList)}>
      {children}
      <span>{caption}</span>
    </a>
  );
}

NavLink.propTypes = {
  caption: PropTypes.string.isRequired,
  classList: PropTypes.string
};

export default NavLink;
