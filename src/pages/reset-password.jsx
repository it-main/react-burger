import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import {useDispatch, useSelector} from "react-redux";
import {onFormChange} from "../services/actions/profile";

function ResetPassword() {
  const { password, verificationCode } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className={clsx(style.content)}>
      <form className={style.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          onChange={(event) => onFormChange(event, dispatch)}
          value={password}
          id="password"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={(event) => onFormChange(event, dispatch)}
          id={verificationCode}
        ></Input>
        <Button
          htmlType="button"
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
        url={URL_LOGIN}
      />
    </div>
  );
}

export default ResetPassword;
