import style from "./profile-form.module.css";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { sendRequestUpdateUser } from "../../services/actions/profile";
import { useForm } from "../../hooks/useForm";

function ProfileForm() {
  const dispatch = useDispatch();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { name, email } = useSelector((state) => state.profile);
  const { values, handleChange, setValues } = useForm({
    name,
    email,
    password: "",
  });
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
    setValues({ name, email, password: "" });
    setEditForm(false);
    setInputNameDisabled(true);
    setInputEmailDisabled(true);
    setInputPasswordDisabled(true);
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(sendRequestUpdateUser(values));
  }

  function handleCancel() {
    formInit();
  }

  function handleOnChangeInput(event) {
    setEditForm(true);
    handleChange(event);
  }

  function handleNameIconClick() {
    setInputNameDisabled(!inputNameDisabled);
    inputNameDisabled ? setInputFocus(nameRef) : setValues({ ...values, name }); //пользователь передумал
    editForm &&
      !inputNameDisabled &&
      inputPasswordDisabled &&
      inputEmailDisabled &&
      setEditForm(false);
  }

  function handleEmailIconClick() {
    setInputEmailDisabled(!inputEmailDisabled);
    inputEmailDisabled
      ? setInputFocus(emailRef)
      : setValues({ ...values, email }); //пользователь передумал
    editForm &&
      inputNameDisabled &&
      inputPasswordDisabled &&
      !inputEmailDisabled &&
      setEditForm(false);
  }
  function handlePasswordIconClick() {
    setInputPasswordDisabled(!inputPasswordDisabled);
    inputPasswordDisabled
      ? setInputFocus(passwordRef)
      : setValues({ ...values, password: "" }); //пользователь передумал
    editForm &&
      inputNameDisabled &&
      !inputPasswordDisabled &&
      inputEmailDisabled &&
      setEditForm(false);
  }
  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleOnChangeInput}
        onIconClick={handleNameIconClick}
        icon={inputNameDisabled ? "EditIcon" : "CloseIcon"}
        value={values.name}
        name={"name"}
        size={"default"}
        ref={nameRef}
        disabled={inputNameDisabled}
        required
      />
      <Input
        type={"email"}
        onChange={handleOnChangeInput}
        onIconClick={handleEmailIconClick}
        ref={emailRef}
        value={values.email}
        name={"email"}
        placeholder="Логин"
        icon={inputEmailDisabled ? "EditIcon" : "CloseIcon"}
        disabled={inputEmailDisabled}
        required
      />
      <Input
        type={"password"}
        onChange={handleOnChangeInput}
        onIconClick={handlePasswordIconClick}
        value={values.password}
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
