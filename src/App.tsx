import React from "react";
import "./App.css";
import { HeaderComponent } from "./features/header/Header";
import { Route } from "react-router-dom";
import { ApplianceList } from "./features/applianceList/ApplianceList";
import { Appliance } from "./features/appliance/Appliance";
import { ApplianceForm } from "./features/applianceForm/ApplianceForm";
import { Job } from "./features/job/Job";
import { JobList } from "./features/jobList/JobList";
import { JobForm } from "./features/jobForm/JobForm";
import { HomePage } from "./features/homePage/homePage";
import { toDo } from "./features/toDo/toDo";
import { AssistantComponent } from "./features/assistant/assistant";

import styled, { createGlobalStyle } from "styled-components";

// получаем значение для целевой платформы
import { sberBox } from "@sberdevices/plasma-tokens/typo";
// получаем стилевые объекты для нашего интерфейса
import { body1, headline2 } from "@sberdevices/plasma-tokens";

// получаем тему персонажа
import { darkJoy } from "@sberdevices/plasma-tokens/themes";
// получаем цвета для нашего интерфейса
import { text, background, gradient } from "@sberdevices/plasma-tokens";
import { foodCard } from "./features/foodCard/foodCard";
import { recipePage } from "./features/recipePage/recipePage";

const AppStyled = styled.div`
  padding: 30px;
  ${body1}
`;

// создаем react-компонент c глобальными стилями типографики
const TypoScale = createGlobalStyle(sberBox);

// создаем react-компонент для подложки
const DocStyles = createGlobalStyle`
    /* stylelint-disable-next-line selector-nested-pattern */
    html {
        color: ${text};
        background-color: ${background};
        background-image: ${gradient};
        /** необходимо залить градиентом всю подложку */
        min-height: 100vh;
    }
`;
// создаем react-компонент для персонажа
const Theme = createGlobalStyle(darkJoy);

function App(): JSX.Element {
  return (
    <AppStyled>
      <div>
        <TypoScale />
        <DocStyles />
        <Theme />
        <HeaderComponent />
        {/* <AssistantComponent /> */}
        {/* <Route path="/" exact={true} component={toDo} /> */}
        <Route path="/" exact={true} component={foodCard} />
        <Route path="/recipe" exact={true} component={recipePage} />
        {/* <Route path="/" exact={true} component={HomePage} /> */}
        {/* <Route path="/appliance/view/:id" exact={true} component={Appliance} />
      <Route path="/appliance/create/" exact={true} component={ApplianceForm} />
      <Route
        path="/appliance/edit/:id"
        exact={true}
        component={ApplianceForm}
      />
      <Route path="/job/view/:id" exact={true} component={Job} />
      <Route path="/jobs" exact={true} component={JobList} />
      <Route path="/appliance/jobs/:id" exact={true} component={JobList} />
      <Route path="/job/create/" exact={true} component={JobForm} />
      <Route path="/job/edit/:id" exact={true} component={JobForm} /> */}
      </div>
    </AppStyled>
  );
}

export default App;
