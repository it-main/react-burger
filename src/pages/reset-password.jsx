import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch } from "react-redux";
import {
  onFormChange,
  sendRequestResetPassword,
} from "../services/actions/profile";
import { useState } from "react";

function ResetPassword() {
  const [form, setFormValue] = useState({ password: "", token: "" });

  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestResetPassword(password, token));
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
          id="password"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(event) => setToken(event.target.value)}
          value={token}
          id="token"
        ></Input>
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Сохранить
        </Button>
      </form>
      <FormAdditionalAction
        label="Вспомнили пароль?"
        linkCaption="Войти"
        url={URL_LOGIN}
      />
    </div>
  );
}

export default ResetPassword;
