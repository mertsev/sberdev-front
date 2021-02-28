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
      id: 1,
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
      id: 2,
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
      id: 3,
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
      // const history = useHistory();
      console.log(action);
      // history.push("/recipe");
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const { select_recipe } = foodCardSlice.actions;

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
export const selectFoodCard = (state: RootState) => state.foodCard;

export default foodCardSlice.reducer;
