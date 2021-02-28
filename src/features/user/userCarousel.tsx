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
import { selectUserCarousel, select_achievements } from "./userCarouselSlice";
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
import { text } from "@sberdevices/plasma-tokens";

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

export const userCarousel: FC = memo(() => {
  const userAchievements = useSelector(selectUserCarousel);
  const items = userAchievements.achievements;

  const dispatch = useDispatch();
  // const [appState, dispatch] = useReducer(reducer, { notes: [] });

  // const [note, setNote] = useState("");
  const note = "testNote";
  const assistantStateRef = useRef<AssistantAppState>();
  const assistantRef = useRef<ReturnType<typeof createAssistant>>();

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
        dispatch(select_achievements(action.note));
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
          {items.map(({ title, description, picture }, i) => (
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
                      <TextBoxSubTitle>{description}</TextBoxSubTitle>
                    </TextBox>
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
