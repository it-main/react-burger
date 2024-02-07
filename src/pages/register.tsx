import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { routes } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { sendRequestRegister } from "../services/actions/profile";
import { useForm } from "../hooks/useForm";
import { useDispatch } from "../services/types/hooks";
import { FormEvent } from "react";

function Register() {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = values;
  const dispatch = useDispatch();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(sendRequestRegister({ name, email, password }));
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type="text"
          value={name}
          placeholder="Имя"
          onChange={handleChange}
          name="name"
        ></Input>
        <EmailInput onChange={handleChange} value={email} name="email" />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          value={password}
          onChange={handleChange}
          name="password"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Зарегистрироваться
        </Button>
      </form>
      <FormAdditionalAction
        label="Уже зарегистрированы?"
        linkCaption="Войти"
        patch={routes.login}
      />
    </div>
  );
}

export default Register;
