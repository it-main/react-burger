import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./form.module.css";
import { URL_LOGIN } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";

function ForgotPassword() {
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
  let email;
  return (
    <div className={clsx(style.content)}>
      <form className={style.form}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput onChange={onFormChange} value={email} id="email" />
        <Button
          htmlType="button"
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
        url={URL_LOGIN}
        extraClass="mb-4"
      />
    </div>
  );
}

export default ForgotPassword;
