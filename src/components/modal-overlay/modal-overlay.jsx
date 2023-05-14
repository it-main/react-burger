import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, setActive }) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => setActive(false)}
      >
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  setActive: PropTypes.func
};

export default ModalOverlay;
