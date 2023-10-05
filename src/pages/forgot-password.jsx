import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { sendRequestResetPassword } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { FORM_SET_VALUE } from "../services/actions/profile";

function ForgotPassword() {
  const { email } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  function setFormValue(field, value) {
    return { type: FORM_SET_VALUE, payload: { field, value } };
  }
  const onFormChange = (e) => {
    dispatch(setFormValue(e.target.id, e.target.value));
  };
  return (
    <div className={style.content}>
      <form className={style.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput onChange={onFormChange} value={email} id="email" />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass="mb-20"
          onClick={sendRequestResetPassword}
        >
          Восстановить
        </Button>
      </form>
      <FormAdditionalAction
        label="Вспомнили пароль?"
        linkCaption="Войти"
        url={URL_LOGIN}
        extraClass="mb-4"
      />
    </div>
  );
}

export default ForgotPassword;
