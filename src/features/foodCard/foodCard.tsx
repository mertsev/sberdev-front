import React, {
  FC,
  memo,
  useReducer,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  createSmartappDebugger,
  createAssistant,
  AssistantAppState,
} from "@sberdevices/assistant-client";
import "./foodCard.css";

import { useSelector, useDispatch } from "react-redux";

// import { reducer } from "./store";
import { select_recipe, selectFoodCard } from "./foodCardSlice";
import {
  Button,
  Card,
  CardBody,
  CardContent,
  CardMedia,
  TextBox,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBoxSubTitle,
} from "@sberdevices/ui";
import { Redirect, useHistory } from "react-router-dom";

const initializeAssistant = (getState: any) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: process.env.REACT_APP_TOKEN ?? "",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
      getState,
    });
  }

  return createAssistant({ getState });
};

type foodCardAction = {
  type: string;
  payload?: string;
};

export const foodCard: FC = memo(() => {
  const history = useHistory();
  const toDo = useSelector(selectFoodCard);
  const dispatch = useDispatch();
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });

  // const [note, setNote] = useState("");
  const note = "testNote";
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      console.log(action);
      if (action) {
        if (action.type == "choose_recipe_by_id") {
          console.log("kek");

          history.push("/recipe");
        }
        action = action as foodCardAction;
        console.log(action);
        dispatch(select_recipe(action.type));
      }
    });
  }, []);

  // useEffect(() => {
  //   assistantStateRef.current = {
  //     item_selector: {
  //       items: toDo.notes.map(({ id, title }, index) => ({
  //         number: index + 1,
  //         id,
  //         title,
  //       })),
  //     },
  //   };
  // }, [toDo]);

  return (
    <>
      <Card
        style={{ width: "22.5rem" }}
        tabIndex={-1}
        outlined={true}
        scaleOnFocus={true}
      >
        <CardBody>
          <CardMedia
            src="./sberkot_fat.png"
            // placeholder="./images/320_320_1.jpg"
            ratio={"16 / 9"}
          />
          <CardContent>
            <TextBox>
              <TextBoxBigTitle>{"Потребительский кредит"}</TextBoxBigTitle>
              <TextBoxBiggerTitle>{"до 420 000 ₽"}</TextBoxBiggerTitle>
              <TextBoxSubTitle>{"На 69 месяцев, ставка 14,8%"}</TextBoxSubTitle>
            </TextBox>
            <Button
              text="Label"
              view="primary"
              size="s"
              scaleOnInteraction={false}
              outlined={false}
              // fullWidth
              style={{ marginTop: "1em" }}
              tabIndex={-1}
            />
          </CardContent>
        </CardBody>
      </Card>

      <Card
        style={{ width: "22.5rem" }}
        tabIndex={-1}
        outlined={true}
        scaleOnFocus={true}
      >
        <CardBody>
          <CardMedia
            src="./sberkot_fat.png"
            // placeholder="./images/320_320_1.jpg"
            ratio={"16 / 9"}
          />
          <CardContent>
            <TextBox>
              <TextBoxBigTitle>{"Потребительский кредит"}</TextBoxBigTitle>
              <TextBoxBiggerTitle>{"до 420 000 ₽"}</TextBoxBiggerTitle>
              <TextBoxSubTitle>{"На 69 месяцев, ставка 14,8%"}</TextBoxSubTitle>
            </TextBox>
            <Button
              text="Label"
              view="primary"
              size="s"
              scaleOnInteraction={false}
              outlined={false}
              // fullWidth
              style={{ marginTop: "1em" }}
              tabIndex={-1}
            />
          </CardContent>
        </CardBody>
      </Card>
    </>
  );
});
