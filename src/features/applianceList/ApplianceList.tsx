import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppliances, selectAllAppliances } from "./applianceListSlice";
import styles from "./ApplianceList.module.css";

export function ApplianceList() {
  const appliances = useSelector(selectAllAppliances);
  const dispatch = useDispatch();

  //const setApplianceList = () => dispatch(fetchAppliances(1));

  return (
    <div>
      <div className={styles.card}>
        {/* <span className={styles.card}>Id: {appliance._id}</span>
      <span className={styles.card}>Name: {appliance.deviceName}</span>
      {appliance.powerState ?
        <span className={styles.card}>Power: On</span>:
        <span className={styles.card}>Power: Off</span>
      } */}
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAppliances(1))}
        >
          Update
        </button>
        {appliances.applianceList.map((appliance) => (
          <div>
            <span>Id: {appliance._id}</span>
            <span>Name: {appliance.deviceName}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
