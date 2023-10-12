import {
  FORM_SET_VALUE, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_INIT,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from "../actions/profile";

const initialState = {
  name: "",
  email: "",
  password: "",
  isAuth: false,
  sendRequest: false,
  successRequest: undefined,
  errorRequest: undefined,
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        sendRequest: true,
        successRequest: undefined,
        errorRequest: undefined,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        sendRequest: false,
        successRequest: action.payload,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        sendRequest: false,
        successRequest: undefined,
      };
    }
    // case RESET_PASSWORD_INIT: {
    //   return {
    //     ...state,
    //     sendRequest: false,
    //     resultRequestForgotPassword: undefined,
    //   };
    // }
    case REGISTER_REQUEST: {
      return {
        ...state,
        sendRequest: true,
        successRequest: undefined,
      };
    }
    case REGISTER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        sendRequest: false,
        successRequest: true,
        isAuth: true,
        name: data.name,
        email: data.email,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        sendRequest: false,
        successRequest: false,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        sendRequest: true,
        successRequest: undefined,
      };
    }
    case LOGIN_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        sendRequest: false,
        successRequest: true,
        isAuth: true,
        name: data.name,
        email: data.email,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        sendRequest: false,
        successRequest: false,
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
