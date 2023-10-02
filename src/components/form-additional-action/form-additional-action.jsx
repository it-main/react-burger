import style from "./registration-additional-action.module.css";
import { URL_REGISTER } from "../../utils/constants";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

function RegistrationAdditionalAction({ label, linkCaption }) {
  return (
    <p className={clsx("text text_type_main-default", style.label)}>
      {label}
      <Link className={"ml-2"} to={URL_REGISTER}>
        {linkCaption}
      </Link>
    </p>
  );
}

export default RegistrationAdditionalAction;
