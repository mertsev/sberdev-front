import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createNewAppliance } from "./applianceFormSlice";
import styles from "./ApplianceForm.module.css";
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

export function ApplianceForm() {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
  } = useForm<ApplianceInputs>();

  const onSubmit: SubmitHandler<ApplianceInputs> = (data) => {
    // const newAppliance = {
    //   deviceName: data.deviceName,
    //   powerState: data.powerState,
    // };
    console.log(data);
    dispatch(createNewAppliance(data.deviceName, data.powerState.value));
    alert(JSON.stringify(data));
  }; // your form submit function which will invoke after successful validation

  // useEffect(() => {
  //   dispatch(fetchAppliance(id));
  // }, []);
  //console.log(id);
  return (
    <div>
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
          defaultValue="true"
          simpleValue="true"
        />

        <input type="submit" />
      </form>
    </div>
  );
}
