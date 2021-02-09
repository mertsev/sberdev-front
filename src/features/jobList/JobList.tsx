import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, fetchJobsByDeviceId, selectAllJobs } from "./jobListSlice";
import styles from "./JobList.module.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function JobList(): JSX.Element {
  const jobs = useSelector(selectAllJobs);
  const dispatch = useDispatch();
  const deviceId: { id: string } = useParams<{ id: string }>();
  const idDevice = deviceId.id;
  console.log(idDevice);

  useEffect(() => {
    if (!idDevice) {
      console.log("1");
      dispatch(fetchJobs(1));
    } else {
      console.log("2");
      dispatch(fetchJobsByDeviceId(idDevice));
    }
  }, []);

  return (
    <div>
      {/* Show appliance id in editing mode */}
      {idDevice ? <div>Device {idDevice} Jobs</div> : <div>All jobs</div>}
      {jobs.jobList.map((job) => (
        <Link to={{ pathname: `/job/view/${job._id}` }}>
          <div className={styles.card}>
            <span>Id: {job._id}</span>
            <span> Name: {job.jobName}</span>
            <span> Device: {job.deviceId}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
