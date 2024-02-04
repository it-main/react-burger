import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TGetIngredientActions,
} from "../actions/ingredients";

type TIngredientsReducer = {
  availableIngredients: TIngredient[];
  statusAvailableIngredients: boolean | undefined;
};

const initialState: TIngredientsReducer = {
  availableIngredients: [],
  statusAvailableIngredients: undefined,
};

export const ingredientsReducer = (
  state = initialState,
  action: TGetIngredientActions,
) => {
  switch (action.type) {
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        availableIngredients: [...action.payload],
        statusAvailableIngredients: true,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        statusAvailableIngredients: false,
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        statusAvailableIngredients: undefined,
      };
    }
    default:
      return state;
  }
};
