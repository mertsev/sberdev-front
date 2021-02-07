import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export function Header() {
  return (
    <div>
      <Link to="/">
        <button type="button">Home (Appliances List)</button>
      </Link>
      <Link to="/">
        <button type="button">Jobs List</button>
      </Link>
    </div>
  );
}
