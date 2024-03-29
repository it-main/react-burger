import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { clsx } from "clsx";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

function Modal(props) {
  const { closeModal, children } = props;

  useEffect(() => {
    const handleKeydown = ({ key }) => {
      key === "Escape" && closeModal();
    };
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  return createPortal(
    <ModalOverlay closeModal={closeModal}>
      <div
        className={clsx(styles.modal, "p-10")}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={clsx(styles.closeIcon, "mt-15 mr-10")}>
          <CloseIcon type="primary" onClick={() => closeModal()} />
        </div>
        {/*</header>*/}
        {children}
      </div>
    </ModalOverlay>,
    document.querySelector("#portal"),
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
