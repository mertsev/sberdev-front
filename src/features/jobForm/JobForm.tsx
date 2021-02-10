import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewJob, updateExistingJob } from "./jobFormSlice";
//import styles from "./ApplianceForm.module.css";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  fetchAppliances,
  selectAllAppliances,
} from "../applianceList/applianceListSlice";
import { Appliance } from "../../api/applianceAPI";

type JobInputs = {
  deviceId: string;
  jobName: string;
  startTime: string;
  endTime: string;
};

export function JobForm(): JSX.Element {
  const dispatch = useDispatch();
  const appliances = useSelector(selectAllAppliances);

  const applianceNames = appliances.applianceList.map((appliance) => {
    const structure = { value: appliance._id, label: appliance._id };
    return structure;
  });

  useEffect(() => {
    dispatch(fetchAppliances(1));
  }, []);

  const jobId: { id: string } = useParams<{ id: string }>();
  const idJob = jobId.id;
  const { register, handleSubmit, errors, control } = useForm<JobInputs>();

  const onSubmit: SubmitHandler<JobInputs> = (data) => {
    if (idJob) {
      dispatch(
        updateExistingJob(
          idJob,
          data.deviceId,
          data.jobName,
          data.startTime,
          data.endTime
        )
      );
      console.log("updating job");
    } else {
      dispatch(
        createNewJob(data.deviceId, data.jobName, data.startTime, data.endTime)
      );
    }
  }; // your form submit function which will invoke after successful validation

  return (
    <div>
      {/* Show job id in editing mode */}
      {idJob ? <div>Editing Job id: {idJob}</div> : <div>Creating new job</div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Device Id</label>
        <Controller
          name="deviceId"
          as={Select}
          options={applianceNames}
          control={control}
        />
        {errors.deviceId && <p>Please enter Device Id</p>}
        <label>Job Name</label>
        <input
          name="endTime"
          defaultValue="Oven 4000"
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.jobName && <p>Please enter a Job name</p>}
        <label>Start Time</label>
        <input
          name="startTime"
          defaultValue="1993-05-23"
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.startTime && <p>Please enter start time</p>}
        <label>End Time</label>
        <input
          name="endTime"
          defaultValue="1997-05-23"
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.endTime && <p>Please enter ending name</p>}
        {/* <label>Power state</label>
        <Controller
          name="powerState"
          as={Select}
          options={[
            { value: true, label: "On" },
            { value: false, label: "Off" },
          ]}
          control={control}
          defaultValue={{ value: true, label: "On" }}
        />
        {errors.powerState && <p>Please enter a device name</p>} */}
        <input type="submit" />
      </form>
    </div>
  );
}
