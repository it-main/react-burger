import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { url } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { signIn } from "../services/auth";

function Login() {
  const [form, setFormValue] = useState({ email: "", password: "" });
  const { password, email } = form;
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signIn(email, password));
  }

  function onChange(event) {
    setFormValue({ ...form, [event.target.id]: event.target.value });
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput onChange={onChange} value={email} id="email" />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={onChange}
          value={password}
          id="password"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Войти
        </Button>
      </form>
      <FormAdditionalAction
        label="Вы - новый пользователь?"
        linkCaption="Зарегистрироваться"
        url={url.register}
        extraClass="mb-4"
      />
      <FormAdditionalAction
        label="Забыли пароль?"
        linkCaption="Восстановить пароль"
        url={url.forgot}
      />
    </div>
  );
}

export default Login;
