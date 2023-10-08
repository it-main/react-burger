import {
  FORM_SET_VALUE,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../actions/profile";

const initialState = {
  name: undefined,
  email: "",
  password: "",
  verifyCode: "",
  sendRequest: false,
  resultRequestForgotPassword: undefined,
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        //email: action.payload,
        sendRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        sendRequest: false,
        resultRequestForgotPassword: action.payload,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        sendRequest: false,
        //email: undefined,
      };
    }
    case FORM_SET_VALUE: {
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    }
    default:
      return state;
  }
};
