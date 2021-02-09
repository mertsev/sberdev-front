import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, selectAllJobs } from "./jobListSlice";
import styles from "./JobList.module.css";
import { Link } from "react-router-dom";

export function JobList(): JSX.Element {
  const jobs = useSelector(selectAllJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs(1));
  }, []);

  return (
    <div>
      {jobs.jobList.map((job) => (
        <Link to={{ pathname: `/job/view/${job._id}` }}>
          <div className={styles.card}>
            <span>Id: {job._id}</span>
            <span> Name: {job.deviceId}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
