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
  Carousel,
  CarouselCol,
  CarouselGridWrapper,
  CarouselItem,
  Col,
  Row,
  TextBox,
  TextBoxBiggerTitle,
  TextBoxBigTitle,
  TextBoxSubTitle,
  useRemoteHandlers,
} from "@sberdevices/ui";
import { Link, Redirect, useHistory } from "react-router-dom";

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
  name?: string;
};

export const foodCard: FC = memo(() => {
  const recipes = useSelector(selectFoodCard);
  const items = recipes.recipes;

  const axis = "x";

  const [index, setIndex] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 150,
    min: 0,
    max: items.length - 1,
  });
  const history = useHistory();
  const dispatch = useDispatch();
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });

  // const [note, setNote] = useState("");
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

  useEffect(() => {
    assistantRef.current = initializeAssistant(() => assistantStateRef.current);

    assistantRef.current.on("data", ({ action }: any) => {
      console.log(action);
      if (action) {
        action = action as foodCardAction;
        if (action.type == "choose_recipe_by_name") {
          console.log(action, items);

          const id =
            items.filter((item) => {
              return item.title.toLowerCase() == action.name.toLowerCase();
            })[0]?.id || 0;

          history.push(`/recipe/${id}`);
        }

        if (action.type == "return_to_main_page") {
          console.log("kek");

          history.push("/");
        }

        if (action.type == "return_to_achievements_page") {
          console.log("kek");

          history.push("/user");
        }

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
      <CarouselGridWrapper>
        <Carousel
          as={Row}
          axis={axis}
          index={index}
          animatedScrollByIndex={true}
          scrollAlign={"start"}
          scrollSnapType={"mandatory"}
          detectActive={true}
          detectThreshold={0.5}
          onIndexChange={(i) => setIndex(i)}
          style={{ paddingTop: "1.25rem", paddingBottom: "1.25rem" }}
        >
          {items.map(({ title, subtitle, picture }, i) => (
            <CarouselCol
              key={`item:${i}`}
              size={3}
              sizeXL={4}
              scrollSnapAlign={"start"}
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <Card
                style={{ width: "22.5rem" }}
                tabIndex={-1}
                outlined={true}
                scaleOnFocus={true}
              >
                <CardBody>
                  <CardMedia
                    src={picture}
                    // placeholder="./images/320_320_1.jpg"
                    ratio={"1 / 2"}
                  />
                  <CardContent>
                    <TextBox>
                      <TextBoxBigTitle>{title}</TextBoxBigTitle>
                      {/* <TextBoxBiggerTitle>{subtitle}</TextBoxBiggerTitle> */}
                      <TextBoxSubTitle>{subtitle}</TextBoxSubTitle>
                    </TextBox>
                    <Link to={`/recipe/${i}`}>
                      <Button
                        text="Приготовить"
                        view="primary"
                        size="s"
                        scaleOnInteraction={false}
                        outlined={false}
                        // fullWidth
                        style={{
                          marginTop: "1em",
                          textDecoration: "none",
                          color: "white",
                        }}
                        tabIndex={-1}
                      />
                    </Link>
                  </CardContent>
                </CardBody>
              </Card>
            </CarouselCol>
          ))}
        </Carousel>
      </CarouselGridWrapper>{" "}
    </>
  );
});
