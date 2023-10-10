export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const RESET_PASSWORD_INIT = "RESET_PASSWORD_INIT";
export const FORM_SET_VALUE = "FORM_SET_VALUE";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGOUT = "LOGOUT";

function setFormValue(field, value) {
  return { type: FORM_SET_VALUE, payload: { field, value } };
}

export const onFormChange = (event, dispatch) => {
  dispatch(setFormValue(event.target.id, event.target.value));
};
