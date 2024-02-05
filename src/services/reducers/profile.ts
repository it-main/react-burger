import {
  LOGOUT,
  REQUEST_FAILED,
  SEND_REQUEST,
  SET_AUTH_CHECKED,
  SET_USER,
  TProfileActions,
} from "../actions/profile";

type TProfileReducer = {
  name: string;
  email: string;
  isAuth: boolean;
  isAuthChecked: boolean;
  sendRequest: boolean;
  successRequest: boolean;
};

const initialState: TProfileReducer = {
  name: "",
  email: "",
  isAuth: false,
  isAuthChecked: false,
  sendRequest: false,
  successRequest: false,
};

export const profileReducer = (
  state = initialState,
  action: TProfileActions,
) => {
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
