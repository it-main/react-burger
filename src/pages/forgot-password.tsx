import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { checkResponse, forgotPasswordRequest } from "../utils/api";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import style from "./form.module.css";
import { forgotPassword, routes } from "../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { FormEvent } from "react";
import { TMessageResponse, TResponse } from "../services/types/api";

function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useForm<{ email: string }>({ email: "" });
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    forgotPasswordRequest(values.email)
      .then(checkResponse<TResponse<TMessageResponse>>)
      .then((json) => {
        if (json.success) {
          localStorage.setItem(forgotPassword, "ok");
          navigate(routes.reset, {
            replace: true,
            state: { from: location.pathname },
          });
        } else {
          console.error("Ошибка получения данных с сервера");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className={style.content}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium" title={"ddd"}>
          Восстановление пароля
        </h1>
        <EmailInput onChange={handleChange} value={values.email} name="email" />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
        >
          Восстановить
        </Button>
      </form>
      <FormAdditionalAction
        label="Вспомнили пароль?"
        linkCaption="Войти"
        patch={routes.login}
        extraClass="mb-4"
      />
    </div>
  );
}

export default ForgotPassword;
