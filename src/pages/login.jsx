import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_FORGOT_PASSWORD, URL_REGISTER } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";

function Login() {
  // const { name, surname, numberOfPets, extraSocket, ownRack } = useSelector(
  //   (state) => state.participantRegistration.form,
  // );
  // const dispatch = useDispatch();
  const onFormChange = (e) => {
    // if (e.target.name === "extraSocket" || e.target.name === "ownRack") {
    //   dispatch(setParticipantFormValue(e.target.name, e.target.checked));
    // } else {
    //   dispatch(setParticipantFormValue(e.target.name, e.target.value));
    // }
  };
  let email, password;
  return (
    <div className={clsx(style.content)}>
      <form className={style.form}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput onChange={onFormChange} value={email} id="email" />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={onFormChange}
          value={password}
          id="password"
        />
        <Button
          htmlType="button"
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
