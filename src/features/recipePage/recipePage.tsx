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
// import { select_recipe } from "../recipeCarousel/recipeCarouselSlice";
import {
  Button,
  Card,
  CardBody,
  CardContent,
  CardMedia,
  Carousel,
  CarouselCol,
  CarouselGridWrapper,
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
import { useParams } from "react-router-dom";

type assistantAction = {
  type: string;
  note?: string;
};

export const recipePage: FC = memo(() => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const note = "testNote";
  const recipes = useSelector(selectFoodCard);
  const item = recipes.recipes[Number(id)];

  const axis = "x";

  const stepsCols: Array<Array<string>> = item.steps.reduce(function (
    rows: any,
    key,
    index
  ) {
    return (
      (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  },
  []);

  const [index, setIndex] = useRemoteHandlers({
    initialIndex: 0,
    axis,
    delay: 30,
    longDelay: 150,
    min: 0,
    max: stepsCols.length,
  });

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
          <CarouselCol
            key={`ingredients:1`}
            scrollSnapAlign={"start"}
            sizeXL={10}
            style={{
              paddingLeft: "30px",
              paddingRight: "30px",
            }}
          >
            <Card
              style={{ marginBottom: "30px", width: "30rem" }}
              tabIndex={-1}
              outlined={true}
              scaleOnFocus={true}
            >
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
          </CarouselCol>
          {stepsCols.map((steps, i) => (
            <CarouselCol
              key={`step:${i}`}
              scrollSnapAlign={"start"}
              style={{ paddingLeft: "30px", paddingRight: "30px" }}
            >
              <Card
                style={{
                  width: "30rem",
                }}
                tabIndex={-1}
                outlined={true}
                scaleOnFocus={true}
              >
                <CardContent compact>
                  <Cell
                    content={<TextBoxBigTitle>{"Шаги"}</TextBoxBigTitle>}
                    // right={<span style={{ marginTop: 5 }}>{"Detail"}</span>}
                  />
                  {steps.map((step, i) => (
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
            </CarouselCol>
          ))}
        </Carousel>
      </CarouselGridWrapper>{" "}
    </>
  );
});
