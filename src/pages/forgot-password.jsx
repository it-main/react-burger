import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { sendRequestForgotPassword } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onFormChange, RESET_PASSWORD_INIT } from "../services/actions/profile";

function ForgotPassword() {
  const { email, resultRequestForgotPassword } = useSelector(
    (state) => state.profile,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestForgotPassword(email));
  }

  useEffect(() => {
    if (resultRequestForgotPassword) {
      navigate("/reset-password", { replace: true });
      dispatch({ type: RESET_PASSWORD_INIT });
    }
  }, [resultRequestForgotPassword]);

  return (
    <div className={style.content}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={(event) => onFormChange(event, dispatch)}
          value={email}
          id="email"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
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
