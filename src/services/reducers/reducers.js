import {
  ADD_INGREDIENT_DETAILS,
  DELETE_INGREDIENT_DETAILS,
  GET_INGREDIENTS_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  ADD_SELECTED_INGREDIENT,
  GET_ORDER_NUMBER_FAILED,
  CLOSE_PLACE_ORDER,
  DELETE_SELECTED_INGREDIENT, SET_DRAGGED_INGREDIENT, SORT_CONSTRUCTOR
} from "../actions/actions";

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
  draggedIngredient: {},
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
    case ADD_SELECTED_INGREDIENT: {
      const ingredient = action.payload;
      const fillings = state.selectedIngredients.fillings;
      return ingredient.type === 'bun'
      ? {
          ...state,
          selectedIngredients: {
            bun: [{...ingredient,  id: crypto.randomUUID()}, {...ingredient,  id: crypto.randomUUID()}],
            fillings: [...fillings]
          }
        }
      : {
        ...state,
        selectedIngredients: {
          bun: [...state.selectedIngredients.bun],
          fillings: [...fillings, {...ingredient,  id: crypto.randomUUID()}]
        }
      }
    }
    case SORT_CONSTRUCTOR: {
      const fillings = [...state.selectedIngredients.fillings];
      fillings.splice(action.payload.hoverIndex, 0, fillings.splice(action.payload.dragIndex, 1)[0]);
      return {
        ...state,
        selectedIngredients: {
          bun: [...state.selectedIngredients.bun],
          fillings: fillings,
        },
      };
    }
    case DELETE_SELECTED_INGREDIENT: {
      return {
          ...state,
          selectedIngredients: {
            bun: [...state.selectedIngredients.bun],
            fillings: state.selectedIngredients.fillings.filter((elem,index) => action.payload !== index )
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
    case SET_DRAGGED_INGREDIENT: {
      return {
        ...state,
        draggedIngredient: action.payload,
      }
    }
    default: return state;
  }
}