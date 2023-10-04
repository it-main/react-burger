import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { clsx } from "clsx";
import style from "./profile.module.css";
import {
  linkIsActive,
  URL_FEED,
  URL_LOGIN,
  URL_PROFILE,
} from "../utils/constants";
import { NavLink } from "react-router-dom";

function Profile() {
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
                linkIsActive(isActive),
              )
            }
          >
            Профиль
          </NavLink>
          <NavLink
            to={URL_FEED}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.link,
                linkIsActive(isActive),
              )
            }
          >
            История заказов
          </NavLink>
          <NavLink
            to={URL_LOGIN}
            className={({ isActive }) =>
              clsx(
                "text text_type_main-medium",
                style.link,
                linkIsActive(isActive),
              )
            }
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

export default Profile;
