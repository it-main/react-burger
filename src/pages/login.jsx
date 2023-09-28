import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./login.module.css";
const LoginPage = () => {
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
      <h1 className={clsx("text text_type_main-medium", style.header)}>Вход</h1>
      <form className={clsx(style.form, "pb-20")}>
        <EmailInput onChange={onFormChange} value={email} id="email" />{" "}
        <Input
          type="password"
          onChange={onFormChange}
          value={password}
          id="password"
        />
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={style.signin}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
