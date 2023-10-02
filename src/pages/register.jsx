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

function RegisterPage() {
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
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input type="text" placeholder="Имя" onChange={onFormChange}></Input>
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

export default RegisterPage;
