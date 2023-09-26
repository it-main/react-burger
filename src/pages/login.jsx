import {
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
      <header className={clsx(style.header, "mb-6")}>
        <h1 className="text text_type_main-medium">Вход</h1>
      </header>
      <form className={style.form}>
        <EmailInput onChange={onFormChange} value={email} id="email" />{" "}
        <Input
          type="password"
          onChange={onFormChange}
          value={password}
          id="password"
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default LoginPage;
