import style from "./profile-form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { sendRequestUpdateUser } from "../../services/actions/profile";
function ProfileForm() {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { name, email } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({ name, email, password: "" });
  const [editForm, setEditForm] = useState(false);
  const [inputNameDisabled, setInputNameDisabled] = useState(true);
  const [inputEmailDisabled, setInputEmailDisabled] = useState(true);
  const [inputPasswordDisabled, setInputPasswordDisabled] = useState(true);

  useEffect(() => {
    formInit();
  }, [name, email]);

  function setInputFocus(ref) {
    setTimeout(() => ref.current.focus(), 0);
  }

  function formInit() {
    setFormData({ name, email, password: "" });
    setEditForm(false);
    setInputNameDisabled(true);
    setInputEmailDisabled(true);
    setInputPasswordDisabled(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestUpdateUser(formData));
  }

  function handleCancel() {
    formInit();
  }

  function handleOnChangeInput(event) {
    setEditForm(true);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleOnChangeInput}
        onIconClick={() => {
          setInputNameDisabled(!inputNameDisabled);
          inputNameDisabled
            ? setInputFocus(nameRef)
            : setFormData({ ...formData, name }); //пользователь передумал
          editForm &&
            !inputNameDisabled &&
            inputPasswordDisabled &&
            inputEmailDisabled &&
            setEditForm(false);
        }}
        icon={inputNameDisabled ? "EditIcon" : "CloseIcon"}
        value={formData.name}
        name={"name"}
        size={"default"}
        ref={nameRef}
        disabled={inputNameDisabled}
        required
      />
      <Input
        type={"email"}
        onChange={handleOnChangeInput}
        onIconClick={() => {
          setInputEmailDisabled(!inputEmailDisabled);
          inputEmailDisabled
            ? setInputFocus(emailRef)
            : setFormData({ ...formData, email }); //пользователь передумал
          editForm &&
            inputNameDisabled &&
            inputPasswordDisabled &&
            !inputEmailDisabled &&
            setEditForm(false);
        }}
        ref={emailRef}
        value={formData.email}
        name={"email"}
        placeholder="Логин"
        icon={inputEmailDisabled ? "EditIcon" : "CloseIcon"}
        disabled={inputEmailDisabled}
        required
      />
      <Input
        type={"password"}
        onChange={handleOnChangeInput}
        onIconClick={() => {
          setInputPasswordDisabled(!inputPasswordDisabled);
          inputPasswordDisabled
            ? setInputFocus(passwordRef)
            : setFormData({ ...formData, password: "" }); //пользователь передумал
          editForm &&
            inputNameDisabled &&
            !inputPasswordDisabled &&
            inputEmailDisabled &&
            setEditForm(false);
        }}
        value={formData.password}
        name={"password"}
        ref={passwordRef}
        icon={inputPasswordDisabled ? "EditIcon" : "CloseIcon"}
        placeholder={"Пароль"}
        disabled={inputPasswordDisabled}
        required
      />
      {editForm && (
        <div className={style.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
