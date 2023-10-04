import style from "./form-additional-action.module.css";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

function FormAdditionalAction({ label, linkCaption, url, extraClass }) {
  return (
    <p className={clsx("text text_type_main-default", extraClass, style.label)}>
      {label}
      <Link className={clsx("ml-2", style.link)} to={url}>
        {linkCaption}
      </Link>
    </p>
  );
}

export default FormAdditionalAction;
