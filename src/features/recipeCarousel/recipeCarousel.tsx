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

import { useSelector, useDispatch } from "react-redux";

// import { reducer } from "./store";
import { select_recipe, selectFoodCard } from "./recipeCarouselSlice";
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

export const recipeCarouselPage: FC = memo(() => {
  const dispatch = useDispatch();

  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

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
          {items.map(({ title, subtitle }, i) => (
            <CarouselCol
              key={`item:${i}`}
              size={3}
              sizeXL={4}
              scrollSnapAlign={"start"}
            >
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
                    ratio={"1 / 2"}
                  />
                  <CardContent>
                    <TextBox>
                      <TextBoxBigTitle>{title}</TextBoxBigTitle>
                      {/* <TextBoxBiggerTitle>{subtitle}</TextBoxBiggerTitle> */}
                      <TextBoxSubTitle>
                        {"На 69 месяцев, ставка 14,8%"}
                      </TextBoxSubTitle>
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
            </CarouselCol>
          ))}
        </Carousel>
      </CarouselGridWrapper>{" "}
    </>
  );
});
