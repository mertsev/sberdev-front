import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import applianceReducer from "../features/appliance/applianceSlice";
import applianceListReducer from "../features/applianceList/applianceListSlice";
import applianceFormReducer from "../features/applianceForm/applianceFormSlice";
import jobReducer from "../features/job/jobSlice";
import jobListReducer from "../features/jobList/jobListSlice";
import toDoReducer from "../features/toDo/toDoSlice";
import foodCardReducer from "../features/foodCard/foodCardSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appliance: applianceReducer,
    applianceList: applianceListReducer,
    appliianceForm: applianceFormReducer,
    job: jobReducer,
    jobList: jobListReducer,
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
