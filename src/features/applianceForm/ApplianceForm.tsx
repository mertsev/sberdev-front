import React from "react";
import { useDispatch } from "react-redux";
import {
  createNewAppliance,
  updateExistingAppliance,
} from "./applianceFormSlice";
//import styles from "./ApplianceForm.module.css";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

type ApplianceStateSelector = {
  value: boolean;
  label: string;
};

type ApplianceInputs = {
  deviceName: string;
  powerState: ApplianceStateSelector;
};

export function ApplianceForm(): JSX.Element {
  const dispatch = useDispatch();
  const applianceId: { id: string } = useParams<{ id: string }>();
  const idAppliance = applianceId.id;
  const {
    register,
    handleSubmit,
    errors,
    control,
  } = useForm<ApplianceInputs>();

  const onSubmit: SubmitHandler<ApplianceInputs> = (data) => {
    if (idAppliance) {
      dispatch(
        updateExistingAppliance(
          idAppliance,
          data.powerState.value,
          data.deviceName
        )
      );
      console.log("updating appliance");
    } else {
      dispatch(createNewAppliance(data.deviceName, data.powerState.value));
    }
  }; // your form submit function which will invoke after successful validation

  return (
    <div>
      {/* Show appliance id in editing mode */}
      {idAppliance ? (
        <div>Appliance id: {idAppliance}</div>
      ) : (
        <div>Creating new appliance</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Appliance Name</label>
        <input
          name="deviceName"
          defaultValue="Oven 4000"
          ref={register({ required: true, maxLength: 30 })}
        />
        {errors.deviceName && <p>Please enter a device name</p>}
        <label>Power state</label>
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
        {errors.powerState && <p>Please enter a device name</p>}
        <input type="submit" />
      </form>
    </div>
  );
}
