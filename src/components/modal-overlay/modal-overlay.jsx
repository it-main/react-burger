import styles from "./modal-overlay.module.css";
import { createPortal } from "react-dom";
import { useState } from "react";

function ModalOverlay({ children }) {
  return createPortal(
    <div className={styles.modalOverlay}>{children}</div>,
    document.querySelector("#portal")
  );
}
export default ModalOverlay;
