import styles from "./modal-overlay.module.css";

type PropsModalOverlay = {
  children: React.ReactNode;
  closeModal: () => void;
};

function ModalOverlay({ children, closeModal }: PropsModalOverlay) {
  return (
    <div className={styles.modalOverlay} onClick={() => closeModal()}>
      {children}
    </div>
  );
}

export default ModalOverlay;
