import style from "./form-additional-action.module.css";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

import PropTypes from "prop-types";

function FormAdditionalAction({ label, linkCaption, patch, extraClass }) {
  return (
    <p className={clsx("text text_type_main-default", extraClass, style.label)}>
      {label}
      <Link className={clsx("ml-2", style.link)} to={patch}>
        {linkCaption}
      </Link>
    </p>
  );
}

FormAdditionalAction.propTypes = {
  label: PropTypes.string,
  linkCaption: PropTypes.string.isRequired,
  patch: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default FormAdditionalAction;
