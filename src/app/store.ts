import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import applianceReducer from "../features/appliance/applianceSlice";
import applianceListReducer from "../features/applianceList/applianceListSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    appliance: applianceReducer,
    applianceList: applianceListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
