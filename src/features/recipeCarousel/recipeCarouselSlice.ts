import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { AppThunk, RootState } from "../../app/store";

type Recipe = {
  id: number;
  title: string;
};

type RecipeState = {
  recipes: Recipe[];
};

const initialState: RecipeState = {
  recipes: [
    {
      id: 1,
      title: "Омлет",
    },
    {
      id: 2,
      title: "Салат Цезарь",
    },
    {
      id: 3,
      title: "Сытный дед",
    },
  ],
};

export const foodCardSlice = createSlice({
  name: "foodCard",
  initialState,
  reducers: {
    select_recipe: (state, action: PayloadAction<string>) => {
      // const history = useHistory();
      console.log(action);
      // history.push("/recipe");
    },
  },
});

export const { select_recipe } = foodCardSlice.actions;

export const selectFoodCard = (state: RootState) => state.foodCard;

export default foodCardSlice.reducer;
