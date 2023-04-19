import styles from "./nav-link.module.css";
function NavLink(props) {
  const { Icon, caption } = props;
  return (
    <a className={`pr-5 pl-5 pt-4 pb-4 ${styles.link}`}>
      <Icon />
      <span>{caption}</span>
    </a>
  );
}

export default NavLink;
