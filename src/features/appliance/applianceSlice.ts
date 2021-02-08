import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { deleteAppliance, getAppliance } from "../../api/applianceAPI";

interface ApplianceState {
  _id: string;
  powerState: boolean;
  deviceName: string;
}

const initialState: ApplianceState = {
  _id: "none",
  powerState: false,
  deviceName: "unknown device",
};

export const ApplianceSlice = createSlice({
  name: "Appliance",
  initialState,
  reducers: {
    setAppliance: (state, action: PayloadAction<ApplianceState>) => {
      //console.log(action);
      state._id = action.payload._id;
      state.powerState = action.payload.powerState;
      state.deviceName = action.payload.deviceName;
    },
    removeAppliance: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state._id = "null";
      state.powerState = false;
      state.deviceName = "null";
    },
    // decrement: state => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { setAppliance, removeAppliance } = ApplianceSlice.actions;

export const fetchAppliance = (_id: string): AppThunk => async (dispatch) => {
  try {
    const appliance = await getAppliance(_id);
    dispatch(setAppliance(appliance));
  } catch (err) {
    console.log(err);
  }
};

export const deleteApplianceAs = (_id: string): AppThunk => async (
  dispatch
) => {
  try {
    const appliance = await deleteAppliance(_id);
    dispatch(removeAppliance());
    alert("Appliance was deleted");
  } catch (err) {
    console.log(err);
  }
};

// export const changeAppliance = (
//   _id: string,
//   powerState: boolean,
//   deviceName: string
// ): AppThunk => async (dispatch) => {
//   try {
//     const appliance = await getAppliance(_id);
//     dispatch(setAppliance(appliance));
//   } catch (err) {
//     console.log(err);
//   }
// };

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const getApplianceById = (id: string): AppThunk => dispatch => {
//   fetch('/article/fetch/post/image', {
//     method: 'POST',
//     body: blob
//   }).then((response) => {
//     console.log(response);
//     );
// };

// export const incrementAsync = (amount: number): AppThunk => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.Appliance.value)`
export const selectAppliance = (state: RootState) => state.appliance;

export default ApplianceSlice.reducer;
