import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import toDoReducer from "../features/toDo/toDoSlice";
import foodCardReducer from "../features/foodCard/foodCardSlice";

export const store = configureStore({
  reducer: {
    toDoList: toDoReducer,
    foodCard: foodCardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
