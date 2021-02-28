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
  Col,
  Container,
  MarkedItem,
  Row,
  TextBox,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBoxSubTitle,
  TextBoxTitle,
  useRemoteHandlers,
} from "@sberdevices/ui";
import { accent, primary, text } from "@sberdevices/plasma-tokens";
import { IconDone } from "@sberdevices/plasma-icons";
import { selectFoodCard } from "../foodCard/foodCardSlice";

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

  // const items = [
  //   { title: "Item 1", subtitle: "Ekek" },
  //   { title: "Item 2", subtitle: "Ekek" },
  //   { title: "Item 3", subtitle: "Ekek" },
  //   { title: "Item 4", subtitle: "Ekek" },
  // ];
  const recipes = useSelector(selectFoodCard);
  const item = recipes.recipes[0];

  return (
    <>
      <Container>
        <Row>
          <Col size={10} sizeXL={5}>
            <Card style={{ marginBottom: "30px" }}>
              <CardContent compact>
                <Cell
                  content={<TextBoxBigTitle>{"Ингредиенты"}</TextBoxBigTitle>}
                  // right={<span style={{ marginTop: 5 }}>{"Detail"}</span>}
                />
                {item.ingredients.map((ingredient, i) => (
                  <CellListItem
                    key={`item:${i}`}
                    left={
                      <CellIcon>
                        {/* <IconPlaceholder size={2.25} /> */}
                      </CellIcon>
                    }
                    content={
                      <>
                        <MarkedItem style={{ color: primary }}>
                          <IconDone size="xs" color={accent} />
                          {ingredient}
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
          </Col>
          <Col sizeXL={7} size={10}>
            <Card style={{ boxSizing: "border-box" }}>
              <CardContent compact>
                <Cell
                  content={<TextBoxBigTitle>{"Шаги"}</TextBoxBigTitle>}
                  // right={<span style={{ marginTop: 5 }}>{"Detail"}</span>}
                />
                {item.steps.map((step, i) => (
                  <CellListItem
                    key={`item:${i}`}
                    left={
                      <CellIcon>
                        {/* <IconPlaceholder size={2.25} /> */}
                      </CellIcon>
                    }
                    content={
                      <>
                        <MarkedItem style={{ color: primary }}>
                          <IconDone size="xs" color={accent} />
                          {step}
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
          </Col>
        </Row>
      </Container>
    </>
  );
});
