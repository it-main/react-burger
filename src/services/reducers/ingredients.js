import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  GET_INGREDIENTS_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED, ADD_SELECTED_INGREDIENT, GET_ORDER_NUMBER_FAILED, CLOSE_PLACE_ORDER
} from "../actions/ingredients";

const initialState = {
  availableIngredients: [],
  selectedIngredients: {
    bun: [],
    fillings: [],
  },
  ingredientDetails: {},
  orderNumber: undefined,
  statusAvailableIngredients: undefined,
  statusOrderNumber: undefined,
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
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload,
        statusOrderNumber: true,
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        statusOrderNumber: false
      }
    }
    case CLOSE_PLACE_ORDER: {
      return {
        ...state,
        orderNumber: undefined,
      }
    }
    case ADD_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: action.payload
      }
    }
    case DELETE_INGREDIENT_DETAILS: {
      return {
        ...state,
        ingredientDetails: {}
      }
    }
    default: return state;
  }
}