import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useState } from "react";
import { sendRequestRegister } from "../utils/api";
import { useDispatch } from "react-redux";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestRegister(name, email, password));
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type="text"
          value={name}
          placeholder="Имя"
          onChange={(event) => setName(event.target.value)}
        ></Input>
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          id="email"
        />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        url={URL_LOGIN}
      />
    </div>
  );
}

export default Register;
