import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Header.module.css";

export function Header() {
  return (
    <div>
      <Link to="/">
        <button type="button" className={styles.button}>
          Home (Appliances List)
        </button>
      </Link>
      <Link to="/appliance/create">
        <button type="button" className={styles.button}>
          Create appliance
        </button>
      </Link>
    </div>
  );
}
