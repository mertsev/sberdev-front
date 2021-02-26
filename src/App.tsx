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

function App(): JSX.Element {
  return (
    <div>
      <HeaderComponent />
      <Route path="/" exact={true} component={HomePage} />
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
  );
}

export default App;
