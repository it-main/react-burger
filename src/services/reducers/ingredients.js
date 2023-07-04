import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from "../actions/ingredients";

const initialState = {
  availableIngredients: [],
  statusAvailableIngredients: undefined,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS : {
      return {
        ...state,
        availableIngredients: [...action.payload],
        statusAvailableIngredients: true,
      };
    }
    case GET_INGREDIENTS_FAILED : {
      return {
        ...state,
        statusAvailableIngredients: false
      }
    }
    case GET_INGREDIENTS_REQUEST : {
      return {
        ...state,
        statusAvailableIngredients: undefined
      }
    }
    default: return state;
  }
}