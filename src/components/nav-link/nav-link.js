import styles from "./nav-link.module.css";
function NavLink(props) {
  const { Icon, caption, classList } = props;
  return (
    <a className={`pt-4 pb-4 ${styles.link} ${classList}`}>
      {Icon}
      <span>{caption}</span>
    </a>
  );
}

export default NavLink;
