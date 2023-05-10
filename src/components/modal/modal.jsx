import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal(props) {
  const { children } = props;
  return <ModalOverlay>{children}</ModalOverlay>;
}

export default Modal;
