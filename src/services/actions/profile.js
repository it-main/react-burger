export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";
export const FORM_SET_VALUE = "FORM_SET_VALUE";

function setFormValue(field, value) {
  return { type: FORM_SET_VALUE, payload: { field, value } };
}

export  const onFormChange = (event, dispatch) => {
  dispatch(setFormValue(event.target.id, event.target.value));
};
