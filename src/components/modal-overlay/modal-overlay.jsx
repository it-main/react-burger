import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";
import { useState } from "react";

function ModalOverlay(props) {
  const { activeModal, setActiveModal, children } = props;
  //const { children, header, onClose } = props;
  // Возвращаем ReactDOM.createPortal,
  // который поместит дочерние элементы в modalRoot

  return createPortal(
    activeModal && (
      <>
        <div
          className={styles.modal}
          onClick={() => {
            setActiveModal(!activeModal);
          }}
        >
          {children}
        </div>
        {/*<ModalBackDrop onClose={onClose} />*/}
      </>
    ),
    document.querySelector("#portal")
  );
}
export default ModalOverlay;
