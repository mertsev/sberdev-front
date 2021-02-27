import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

type Note = {
  id: string;
  title: string;
  completed: boolean;
};

type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: [
    {
      id: "none",
      title: "none",
      completed: false,
    },
  ],
};

export const ToDoSlice = createSlice({
  name: "ToDo",
  initialState,
  reducers: {
    add_note: (state, action: PayloadAction<Note>) => {
      //console.log(action);
      state.notes.push({
        id: Math.random().toString(36).substring(7),
        title: action.payload.title,
        completed: false,
      });
    },
    done_note: (state, action: PayloadAction<Note>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.notes.push({
        id: Math.random().toString(36).substring(7),
        title: action.payload.title,
        completed: false,
      });
    },
    delete_note: (state, action: PayloadAction<Note>) => {
      state.notes.filter(({ id }) => id !== action.payload.id);
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { add_note, done_note, delete_note } = ToDoSlice.actions;

// export const fetchJob = (_id: string): AppThunk => async (dispatch) => {
//   try {
//     const Job = await getJob(_id);
//     dispatch(setJob(Job));
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteJobAs = (_id: string): AppThunk => async (dispatch) => {
//   try {
//     const Job = await deleteJob(_id);
//     dispatch(removeJob());
//     alert("Job was deleted");
//   } catch (err) {
//     console.log(err);
//   }
// };

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
export const selectToDo = (state: RootState) => state.toDoList;

export default ToDoSlice.reducer;
