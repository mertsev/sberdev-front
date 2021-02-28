import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { AppThunk, RootState } from "../../app/store";
import omelette from "../../img/omelette.png";
import cesar from "../../img/cesar.png";

type Recipe = {
  id: number;
  title: string;
  subtitle: string;
  picture: string;
  steps: string[];
  ingredients: string[];
};

type RecipeState = {
  recipes: Recipe[];
};

const initialState: RecipeState = {
  recipes: [
    {
      id: 0,
      title: "Омлет",
      subtitle: "Это классика, это знать надо!",
      picture: omelette,
      steps: [
        "Разбить яйца",
        "Смешать их с молоком",
        "Вылить получившуюся смесь на сковородку",
        "Посолить",
      ],
      ingredients: ["Молоко", "Яица"],
    },
    {
      id: 1,
      title: "Салат Цезарь",
      subtitle: "Это классика, это знать надо!",
      picture: cesar,
      steps: [
        "Куриную грудку нарезать на кусочки приблизительно 1х3 см.",
        "Положить в сковороду к чесноку и маслу. ",
        "В ту же сковородку добавить еще одну столовую ложку сливочного масла и второй зубчик чеснока.",
        "В это время нарезать на небольшие кубики хлеб.",
        "Положить в сковороду и обжаривать до румяной корочки.",
        "Желательно непрерывно помешивать, чтобы не подгорело.",
      ],
      ingredients: ["Зеленый салат", "Помидоры", "Куриное филе"],
    },
    {
      id: 2,
      title: "Сытный кек",
      subtitle: "Это классика, это знать надо!",
      picture: omelette,
      steps: ["cook2", "kek2"],
      ingredients: ["kek", "bruh"],
    },
  ],
};

export const foodCardSlice = createSlice({
  name: "foodCard",
  initialState,
  reducers: {
    select_recipe: (state, action: PayloadAction<string>) => {
      console.log(action);
    },
  },
});

export const { select_recipe } = foodCardSlice.actions;

export const selectFoodCard = (state: RootState) => state.foodCard;

export default foodCardSlice.reducer;
