import {
  ADD_SELECTED_INGREDIENT,
  CLEAR_SELECTED_INGREDIENTS,
  DELETE_SELECTED_INGREDIENT,
  SORT_SELECTED_INGREDIENTS,
  TBurgerConstructorActions,
} from "../actions/burger-constructor";

type BurgerConstructorReducer = {
  selectedIngredients: TSelectedIngredients;
};

const initialState: BurgerConstructorReducer = {
  selectedIngredients: {
    bun: [],
    fillings: [],
  },
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions,
) => {
  switch (action.type) {
    case ADD_SELECTED_INGREDIENT: {
      const ingredients = action.payload;
      const fillings = state.selectedIngredients.fillings;
      const newIngredients = ingredients.map((elem) => {
        return { ...elem.ingredient, id: elem.id };
      });
      return ingredients[0].ingredient.type === "bun"
        ? {
            ...state,
            selectedIngredients: {
              bun: newIngredients,
              fillings: [...fillings],
            },
          }
        : {
            ...state,
            selectedIngredients: {
              bun: [...state.selectedIngredients.bun],
              fillings: [...fillings, ...newIngredients],
            },
          };
    }
    case SORT_SELECTED_INGREDIENTS: {
      const fillings = [...state.selectedIngredients.fillings];
      fillings.splice(
        action.payload.hoverIndex,
        0,
        fillings.splice(action.payload.dragIndex, 1)[0],
      );
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
          fillings: state.selectedIngredients.fillings.filter(
            (elem, index) => action.payload !== index,
          ),
        },
      };
    }
    case CLEAR_SELECTED_INGREDIENTS: {
      return {
        ...state,
        //Todo
        // selectedIngredients: {
        // bun: [],
        // fillings: [],
        // },
        ...initialState,
      };
    }
    default:
      return state;
  }
};
