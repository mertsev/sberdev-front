import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";
import { AppThunk, RootState } from "../../app/store";
import sberkot1 from "../../img/sberkot_fat.png";
import sberkot2 from "../../img/sberkot_swag.png";

type Achievement = {
  id: number;
  title: string;
  description: string;
  picture: string;
};

type AchievementState = {
  achievements: Achievement[];
};

const initialState: AchievementState = {
  achievements: [
    {
      id: 1,
      title: "Любитель цезаря",
      description: "Приготовили первый цезарь, поздравляем!",
      picture: sberkot1,
    },
    {
      id: 2,
      title: "Желтый кружок",
      description: "Вы мастер яичницы!",
      picture: sberkot2,
    },
  ],
};

export const userCarouselSlice = createSlice({
  name: "userCarousel",
  initialState,
  reducers: {
    select_achievements: (state, action: PayloadAction<string>) => {
      // const history = useHistory();
      console.log(action);
      // history.push("/recipe");
    },
  },
});

export const { select_achievements } = userCarouselSlice.actions;

export const selectUserCarousel = (state: RootState) => state.userCarousel;

export default userCarouselSlice.reducer;
