import axios from "axios";

export interface Job {
  _id: string;
  deviceId: string;
  jobName: string;
  startTime: Date;
  endTime: Date;
}

export async function createJob(
  deviceId: string,
  jobName: string,
  startTime: Date,
  endTime: Date
) {
  console.log(`creating Job`);
  const url = `http://127.0.0.1:8080/api/Job/`;
  const { data } = await axios.post(url, {
    deviceId: deviceId,
    jobName: jobName,
    startTime: startTime,
    endTime: endTime,
  });
  // console.log(data);
  return data.Job;
}

export async function getJob(_id: string) {
  const url = `http://127.0.0.1:8080/api/Job/${_id}/`;
  const { data } = await axios.get(url);
  // console.log(data);
  return data.Job;
}

export async function getAllJobs(page: number) {
  const url = `http://127.0.0.1:8080/api/Job/`;
  const { data } = await axios.get(url);
  // console.log(data);
  return data.Job;
}

export async function updateJob(
  _id: string,
  powerState: boolean,
  deviceName: string
) {
  const url = `http://127.0.0.1:8080/api/Job/${_id}`;
  const { data } = await axios.put(url, {
    powerState: powerState,
    deviceName: deviceName,
  });
  // console.log(data);
  return data.Job;
}

export async function deleteJob(_id: string) {
  const url = `http://127.0.0.1:8080/api/Job/${_id}`;
  const { data } = await axios.delete(url);
  // console.log(data);
  return data.Job;
}
