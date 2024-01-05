import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { routes } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch } from "react-redux";
import { signIn } from "../services/actions/profile";
import { useForm } from "../hooks/useForm";

function Login() {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const { password, email } = values;
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(signIn(email, password));
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput onChange={handleChange} value={email} name="email" />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={handleChange}
          value={password}
          name="password"
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
        patch={routes.register}
        extraClass="mb-4"
      />
      <FormAdditionalAction
        label="Забыли пароль?"
        linkCaption="Восстановить пароль"
        patch={routes.forgot}
      />
    </div>
  );
}

export default Login;
