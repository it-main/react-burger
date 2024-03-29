import {
  SEND_REQUEST,
  SET_USER,
  LOGOUT,
  SET_AUTH_CHECKED,
  REQUEST_FAILED,
} from "../actions/profile";

const initialState = {
  name: "",
  email: "",
  isAuth: false,
  isAuthChecked: false,
  sendRequest: false,
  successRequest: false,
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_REQUEST: {
      return {
        ...state,
        sendRequest: true,
        successRequest: false,
      };
    }

    case REQUEST_FAILED: {
      return {
        ...state,
        sendRequest: false,
        successRequest: false,
      };
    }

    case LOGOUT: {
      return {
        ...initialState,
        isAuthChecked: true,
      };
    }

    case SET_AUTH_CHECKED: {
      return {
        ...state,
        sendRequest: false,
        successRequest: true,
        isAuthChecked: true,
      };
    }

    case SET_USER: {
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
    default:
      return state;
  }
};
