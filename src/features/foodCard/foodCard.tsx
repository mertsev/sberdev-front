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
import { text } from "@sberdevices/plasma-tokens";

import { Carousel } from "@sberdevices/ui";

const stylingCallback = (itemEl: HTMLDivElement, slot: number) => {
  itemEl.style.opacity = `${1 - Math.abs(slot) / 2}`;
};

const stylingResetCallback = (itemEl: HTMLDivElement) => {
  itemEl.style.opacity = "";
};

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

type assistantAction = {
  type: string;
  note?: string;
};

export const foodCard: FC = memo(() => {
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
      if (action) {
        action = action as assistantAction;
        console.log(action);
        dispatch(select_recipe(action.note));
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
