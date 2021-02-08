import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";
import { deleteJob, getJob } from "../../api/jobAPI";

export interface JobState {
  _id: string;
  deviceId: string;
  jobName: string;
  startTime: string;
  endTime: string;
}

const initialState: JobState = {
  _id: "null",
  deviceId: "null",
  jobName: "null",
  startTime: "",
  endTime: "",
};

export const JobSlice = createSlice({
  name: "Job",
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<JobState>) => {
      //console.log(action);
      state._id = action.payload._id;
      state.deviceId = action.payload.deviceId;
      state.jobName = action.payload.jobName;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
    removeJob: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state._id = "null";
      state.deviceId = "null";
      state.jobName = "null";
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

export const { setJob, removeJob } = JobSlice.actions;

export const fetchJob = (_id: string): AppThunk => async (dispatch) => {
  try {
    const Job = await getJob(_id);
    dispatch(setJob(Job));
  } catch (err) {
    console.log(err);
  }
};

export const deleteJobAs = (_id: string): AppThunk => async (dispatch) => {
  try {
    const Job = await deleteJob(_id);
    dispatch(removeJob());
    alert("Job was deleted");
  } catch (err) {
    console.log(err);
  }
};

// export const changeJob = (
//   _id: string,
//   powerState: boolean,
//   deviceName: string
// ): AppThunk => async (dispatch) => {
//   try {
//     const Job = await getJob(_id);
//     dispatch(setJob(Job));
//   } catch (err) {
//     console.log(err);
//   }
// };

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const getJobById = (id: string): AppThunk => dispatch => {
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
// in the slice file. For example: `useSelector((state: RootState) => state.Job.value)`
export const selectJob = (state: RootState) => state.job;

export default JobSlice.reducer;
