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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendRequestRegister } from "../services/actions/profile";

function Register() {
  const [form, setFormValue] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = form;
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestRegister(name, email, password));
  }

  function onChange(event) {
    setFormValue({ ...form, [event.target.id]: event.target.value });
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type="text"
          value={name}
          placeholder="Имя"
          onChange={onChange}
          id="name"
        ></Input>
        <EmailInput onChange={onChange} value={email} id="email" />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          value={password}
          onChange={onChange}
          id="password"
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
