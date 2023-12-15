import {
  FORM_SET_VALUE,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  REQUEST_SENT,
  SET_USER,
  LOGOUT,
  SET_AUTH_CHECKED,
} from "../actions/profile";

const initialState = {
  name: "",
  email: "",
  isAuth: false,
  isAuthChecked: false,
  requestSent: false,
  // successRequest: undefined,
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT: {
      return { ...initialState };
    }
    case SET_USER: {
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        // successRequest: true,
        requestSent: false,
        isAuth: true,
      };
    }
    case SET_AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: action.payload,
        requestSent: false,
      };
    }
    case REQUEST_SENT: {
      return {
        ...state,
        requestSent: true,
        // successRequest: undefined,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        requestSent: true,
        // successRequest: undefined,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        requestSent: false,
        // successRequest: action.payload,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        requestSent: false,
        // successRequest: undefined,
      };
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        requestSent: true,
        // successRequest: undefined,
      };
    }
    case REGISTER_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        requestSent: false,
        // successRequest: true,
        isAuth: true,
        name: data.name,
        email: data.email,
      };
    }
    case REGISTER_FAILED: {
      return {
        ...state,
        requestSent: false,
        // successRequest: false,
      };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        requestSent: true,
        // successRequest: undefined,
      };
    }
    case LOGIN_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        requestSent: false,
        // successRequest: true,
        isAuth: true,
        name: data.name,
        email: data.email,
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        requestSent: false,
        // successRequest: false,
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
