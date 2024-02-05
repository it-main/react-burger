export const ADD_SELECTED_INGREDIENT = "ADD_SELECTED_INGREDIENT";
export const DELETE_SELECTED_INGREDIENT = "DELETE_SELECTED_INGREDIENT";
export const SORT_SELECTED_INGREDIENTS = "SORT_SELECTED_INGREDIENTS";
export const CLEAR_SELECTED_INGREDIENTS = "CLEAR_SELECTED_INGREDIENTS";

type TAddIngredient = {
  readonly type: typeof ADD_SELECTED_INGREDIENT;
  readonly payload: { ingredient: TIngredient; id: string }[];
};

type TDeleteIngredient = {
  readonly type: typeof DELETE_SELECTED_INGREDIENT;
  readonly payload: number;
};

type TSortIngredients = {
  readonly type: typeof SORT_SELECTED_INGREDIENTS;
  readonly payload: { dragIndex: number; hoverIndex: number };
};

type TClearIngredients = {
  readonly type: typeof CLEAR_SELECTED_INGREDIENTS;
};

export type TBurgerConstructorActions =
  | TAddIngredient
  | TDeleteIngredient
  | TSortIngredients
  | TClearIngredients;
