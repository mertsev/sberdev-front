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
//import "./foodCard.css";

import { useSelector, useDispatch } from "react-redux";

// import { reducer } from "./store";
import {
  add_note,
  done_note,
  delete_note,
  selectToDo,
} from "./recipePageSlice";
import {
  Button,
  Card,
  CardBody,
  CardContent,
  CardMedia,
  Cell,
  CellDisclosure,
  CellIcon,
  CellListItem,
  MarkedItem,
  TextBox,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBoxSubTitle,
  TextBoxTitle,
  useRemoteHandlers,
} from "@sberdevices/ui";
import { accent, primary, text } from "@sberdevices/plasma-tokens";
import { IconDone } from "@sberdevices/plasma-icons";

// const initializeAssistant = (getState: any) => {
//   if (process.env.NODE_ENV === "development") {
//     return createSmartappDebugger({
//       token: process.env.REACT_APP_TOKEN ?? "",
//       initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
//       getState,
//     });
//   }

//   return createAssistant({ getState });
// };

type assistantAction = {
  type: string;
  note?: string;
};

export const recipePage: FC = memo(() => {
  const toDo = useSelector(selectToDo);
  const dispatch = useDispatch();
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });

  // const [note, setNote] = useState("");
  const note = "testNote";
  // const assistantStateRef = useRef<AssistantAppState>();
  // const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  // useEffect(() => {
  //   assistantRef.current = initializeAssistant(() => assistantStateRef.current);

  //   assistantRef.current.on("data", ({ action }: any) => {
  //     if (action) {
  //       action = action as assistantAction;
  //       console.log(action);
  //       dispatch(add_note(action.note));
  //     }
  //   });
  // }, []);

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

  const items = [
    { title: "Item 1", subtitle: "Ekek" },
    { title: "Item 2", subtitle: "Ekek" },
    { title: "Item 3", subtitle: "Ekek" },
    { title: "Item 4", subtitle: "Ekek" },
  ];

  const axis = "x";

  const [index, setIndex] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 150,
    min: 0,
    max: items.length - 1,
  });

  return (
    <>
      <Card style={{ width: "20rem" }}>
        <CardContent compact>
          <Cell
            content={<TextBoxBigTitle>{"Ингредиенты"}</TextBoxBigTitle>}
            // right={<span style={{ marginTop: 5 }}>{"Detail"}</span>}
          />
          {items.map((_, i) => (
            <CellListItem
              key={`item:${i}`}
              left={
                <CellIcon>{/* <IconPlaceholder size={2.25} /> */}</CellIcon>
              }
              content={
                <>
                  <MarkedItem text="Дмитрий гордон" style={{ color: primary }}>
                    <IconDone size="xs" color={accent} />
                  </MarkedItem>
                </>
                // <TextBox>
                //   <TextBoxTitle>{"bruh"}</TextBoxTitle>
                //   <TextBoxSubTitle>{"Subtitle"}</TextBoxSubTitle>
                // </TextBox>
              }
              // right={<CellDisclosure />}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
});
