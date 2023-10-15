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
import { useEffect, useState } from "react";
import { sendRequestLogin } from "../services/actions/profile";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector((state) => state.profile);
  const from = useLocation().state?.from || URL_HOME;

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestLogin(email, password));
  }

  // console.log(useLocation().state);
  if (isAuth) return <Navigate to={from} replace />;
  //useEffect(() => {
  //   if (isAuth) {
  //     navigate(from, { replace: true });
  //   }
  //}, [isAuth, navigate, from]);

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
