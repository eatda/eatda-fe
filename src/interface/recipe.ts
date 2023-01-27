export interface RecipeDataType {
  id: number;
  name: {
    title: string;
    comment: string;
  };
  image: string;
  menu: string[];
  carbohydrate: GLfloat;
  protein: GLfloat;
  province: GLfloat;
  salt: GLfloat;
  total_calorie: GLfloat;
  ingredient: {
    title: string;
    data: {
      name: string;
      amount: string;
    }[];
  }[];
  recipe: {
    title: string;
    process: {
      ingredients: string[];
      step: string;
      splitted?: string[];
    }[];
  }[];
  tip: {
    title: string;
    text: string;
  }[];
  user_id: null;
  type_id: number;
  flavor_id: number;
  carbohydrate_type_id: null;
}
