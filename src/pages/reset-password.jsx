import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { routes } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { useDispatch, useSelector } from "react-redux";
import { sendRequestResetPassword } from "../services/actions/profile";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const [form, setFormValue] = useState({
    password: "",
    token: "",
  });
  const { password, token } = form;
  const navigate = useNavigate();
  const from = useLocation().state?.from;
  const { isAuth } = useSelector((state) => state.profile);

  useEffect(() => {
    isAuth && navigate(routes.home, { replace: true });
    from !== routes.forgot && navigate(routes.forgot, { replace: true });
  }, [from, navigate, isAuth]);

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestResetPassword(password, token));
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
        url={routes.login}
      />
    </div>
  );
}

export default ResetPassword;
