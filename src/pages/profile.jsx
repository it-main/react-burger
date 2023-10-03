import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./profile.module.css";
import { URL_LOGIN, URL_PROFILE } from "../utils/constants";
import FormAdditionalAction from "../components/form-additional-action/form-additional-action";
import { NavLink } from "react-router-dom";

function ProfilePage() {
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
      <div className={style.menu}>
        <nav className={style.navigate}>
          <NavLink
            to={URL_PROFILE}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.link,
                isActive ? style.link_active : "text_color_inactive"
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={URL_PROFILE}
            className={clsx(
              style.link,
              "text text_type_main-medium text_color_inactive"
            )}
          >
            История заказов
          </NavLink>
          <NavLink
            to={URL_PROFILE}
            className={clsx(
              "text text_type_main-medium text_color_inactive",
              style.link
            )}
          >
            Выход
          </NavLink>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form className={style.form}>
        <Input type="text" placeholder="Имя" onChange={onFormChange}></Input>
        <EmailInput
          placeholder="Логин"
          onChange={onFormChange}
          value={email}
          id="email"
        />
        <PasswordInput
          placeholder="Пароль"
          icon="ShowIcon"
          onChange={onFormChange}
          value={password}
          id="password"
        />
      </form>
    </div>
  );
}

export default ProfilePage;
