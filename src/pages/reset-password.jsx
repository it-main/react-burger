import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { endpoints, forgotPassword, routes } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { checkResponse, resetPasswordRequest } from "../utils/api";
import { useEffect, useState } from "react";

function ResetPassword() {
  const [form, setFormValue] = useState({
    password: "",
    token: "",
  });
  const navigate = useNavigate();
  const { password, token } = form;
  // const from = useLocation().state?.from;

  //TODO
  // useEffect(() => {
  //   console.log("mount");
  //   return () => {
  //     console.log("unmount");
  //     localStorage.removeItem(forgotPassword);
  //   };
  // }, []);

  function handleSubmit(event) {
    event.preventDefault();
    resetPasswordRequest(password, token)
      .then(checkResponse)
      .then((json) => {
        if (json.success) {
          localStorage.removeItem(forgotPassword);
          navigate(endpoints.login);
        } else {
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  if (!localStorage.getItem(forgotPassword)) {
    return <Navigate to={routes.home} />;
  }

  return (
    <div className={clsx(style.content)}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          onChange={(event) =>
            setFormValue({ ...form, password: event.target.value })
          }
          value={password}
          id="password"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(event) =>
            setFormValue({ ...form, token: event.target.value })
          }
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
        patch={routes.login}
      />
    </div>
  );
}

export default ResetPassword;
