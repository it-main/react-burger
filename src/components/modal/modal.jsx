import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal(props) {
  const { active, children } = props;
  return (
    active && (
      <ModalOverlay>
        <div>
          <h2>title</h2>
          <CloseIcon type="primary" />
        </div>

        {children}
      </ModalOverlay>
    )
  );
}

export default Modal;
