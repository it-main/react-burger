import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./form.module.css";
import { routes } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/actions/profile";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, successRequest } = useSelector((state) => state.profile);
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(forgotPassword(email));
  }

  useEffect(() => {
    isAuth && navigate(routes.home, { replace: true });
    successRequest &&
      navigate("/reset-password", {
        replace: true,
        state: { from: location.pathname },
      });
  }, [navigate, successRequest, isAuth]);

  return (
    <div className={style.content}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          onChange={(event) => setEmail(event.target.value)}
          value={email}
          id="email"
        />
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
