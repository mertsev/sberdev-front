import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAppliance,
  selectAppliance,
} from './applianceSlice';
import styles from './Appliance.module.css';

export function Appliance() {
  const appliance = useSelector(selectAppliance);
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.card}>
      <span className={styles.card}>Id: {appliance._id}</span>
      <span className={styles.card}>Name: {appliance.deviceName}</span>
      {appliance.powerState ?
        <span className={styles.card}>Power: On</span>:
        <span className={styles.card}>Power: Off</span>
      }
      <button className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(fetchAppliance('601e866d8b02834574da0c0e'))}
          >
            Update
      </button>
      </div>
    </div>
  );
}
