import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { clsx } from "clsx";
import {useEffect} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
function Modal(props) {
  const { setActive, header, children } = props;

  useEffect(() => {
    const handleKeydown = ({ key }) => {
    key==='Escape' && setActive(false);
  }
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  })

  return createPortal(
    <ModalOverlay setActive={setActive}>
        <div className={styles.modal} onClick={event => event.stopPropagation()}>
          <header className={clsx(styles.header, "pt-10 pl-10 pr-10")}>
            <h1 className={"text text_type_main-large"}>{header}</h1>
            <div className={styles.closeIcon} >
              <CloseIcon type="primary" onClick={() => setActive(false)}/>
            </div>
          </header>
          {children}
        </div>
      </ModalOverlay>,
    document.querySelector("#portal")
  );
}

Modal.propTypes = {
  header: PropTypes.string,
  setActive: PropTypes.func
};

export default Modal;
