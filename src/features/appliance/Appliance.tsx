import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppliance, selectAppliance } from "./applianceSlice";
import styles from "./Appliance.module.css";
import { useParams } from "react-router-dom";

export function Appliance() {
  const appliance = useSelector(selectAppliance);
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchAppliance(id));
  }, []);
  //console.log(id);
  return (
    <div>
      <div className={styles.card}>
        <span className={styles.card}>Id: {appliance._id}</span>
        <span className={styles.card}>Name: {appliance.deviceName}</span>
        {appliance.powerState ? (
          <span className={styles.card}>Power: On</span>
        ) : (
          <span className={styles.card}>Power: Off</span>
        )}
      </div>
    </div>
  );
}
