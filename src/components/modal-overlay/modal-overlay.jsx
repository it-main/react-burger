import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, closeModal }) {
  return (
    <div
      className={styles.modalOverlay}
      onClick={() => closeModal()}
      >
      {children}
    </div>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalOverlay;
