import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppliances, selectAllAppliances } from "./applianceListSlice";
import styles from "./ApplianceList.module.css";
import { Link } from "react-router-dom";

export function ApplianceList(): JSX.Element {
  const appliances = useSelector(selectAllAppliances);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAppliances(1));
  }, []);

  return (
    <div>
      {appliances.applianceList.map((appliance) => (
        <Link to={{ pathname: `/appliance/view/${appliance._id}` }}>
          <div className={styles.card}>
            <span>Id: {appliance._id}</span>
            <span> Name: {appliance.deviceName}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
