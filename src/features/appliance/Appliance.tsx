import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAppliance, selectAppliance } from "./applianceSlice";
import styles from "./Appliance.module.css";
import { Link, useParams } from "react-router-dom";

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
      {appliance._id === "none" ? (
        <div>Appliance does not exist</div>
      ) : (
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
          <div>
            <Link to={{ pathname: `/appliance/edit/${appliance._id}` }}>
              <button type="button">Edit appliance</button>
            </Link>
            <Link to={{ pathname: `/appliance/edit/${appliance._id}` }}>
              <button type="button">Delete appliance</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
