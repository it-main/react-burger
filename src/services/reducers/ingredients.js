import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_CONSTRUCTOR,
  GET_ORDER_NUMBER,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, ADD_SELECTED_INGREDIENT
} from "../actions/ingredients";

const initialState = {
  availableIngredients: [],
  selectedIngredients: {
    bun: [],
    fillings: [],
  },
  ingredientDetails: {},
  order: {},

  statusAvailableIngredients: undefined
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
    case ADD_SELECTED_INGREDIENT : {
      return action.payload.type==='bun'
        ? {
            ...state,
            selectedIngredients: {
              bun: [action.payload],
              fillings: [...state.selectedIngredients.fillings]
            },
        }
        : {
            ...state,
            selectedIngredients: {
              bun: [...state.selectedIngredients.bun],
              fillings: [...state.selectedIngredients.fillings, action.payload]
            }
        }
    }
    // case GET_INGREDIENTS_CONSTRUCTOR: {
    //   return {
    //
    //   }
    // }
    // case GET_ORDER_NUMBER: {
    //   return {
    //
    //   }
    // }
    // case ADD_INGREDIENT_DETAILS: {
    //   return {
    //
    //   }
    // }
    // case DELETE_INGREDIENT_DETAILS: {
    //   return {
    //
    //   }
    // }
    default: return state;
  }
}