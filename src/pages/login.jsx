import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import {
  URL_FORGOT_PASSWORD,
  URL_HOME,
  URL_REGISTER,
} from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { sendRequestLogin } from "../services/actions/profile";
import { Navigate, useLocation } from "react-router-dom";

function Login() {
  const [form, setFormValue] = useState({ email: "", password: "" });
  const { password, email } = form;
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.profile);
  const from = useLocation().state?.from || URL_HOME;

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestLogin(email, password));
  }

  function onChange(event) {
    setFormValue({ ...form, [event.target.id]: event.target.value });
  }

  if (isAuth) return <Navigate to={from} replace />;

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
