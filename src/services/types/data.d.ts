type TIngredient = {
  _id: string;
  name: string;
  image: string;
  price: number;
  type: string;
  id?: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
};

type TSelectedIngredients = {
  bun: ReadonlyArray<TIngredient>;
  fillings: ReadonlyArray<TIngredient>;
};

type TOrder = {
  _id: string;
  ingredients: string[];
  owner?: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TUser = {
  name: string;
  email: string;
  password: string;
};
