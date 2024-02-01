import style from "./form-additional-action.module.css";
import { Link } from "react-router-dom";
import { clsx } from "clsx";

type FormAdditionalActionProps = {
  label: string;
  linkCaption: string;
  patch: string;
  extraClass?: string;
};

function FormAdditionalAction(props: FormAdditionalActionProps) {
  const { label, linkCaption, patch, extraClass } = props;
  return (
    <p className={clsx("text text_type_main-default", extraClass, style.label)}>
      {label}
      <Link className={clsx("ml-2", style.link)} to={patch}>
        {linkCaption}
      </Link>
    </p>
  );
}

export default FormAdditionalAction;
