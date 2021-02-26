import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppliances, selectAllAppliances } from "./homePageSlice";
import styles from "./ApplianceList.module.css";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardContent,
  CardMedia,
  CardHeadline1,
  Container,
  Row,
  Col,
  Button,
} from "@sberdevices/ui";

export function HomePage(): JSX.Element {
  return (
    <Container>
      <Row>
        <Col sizeS={1} sizeM={2} sizeL={3} sizeXL={4}>
          <Button text={"Кнопочка"}></Button>
        </Col>
      </Row>
    </Container>
  );
}
