import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_FORGOT_PASSWORD, URL_REGISTER } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { sendRequestLogin } from "../services/actions/profile";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestLogin(email, password));
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          id="email"
        />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={(event) => setPassword(event.target.value)}
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
        url={URL_REGISTER}
        extraClass="mb-4"
      />
      <FormAdditionalAction
        label="Забыли пароль?"
        linkCaption="Восстановить пароль"
        url={URL_FORGOT_PASSWORD}
      />
    </div>
  );
}

export default Login;
