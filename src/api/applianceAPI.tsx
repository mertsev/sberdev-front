import axios from "axios";

export interface Appliance {
  _id: string;
  deviceName: string;
  powerState: boolean;
}

export async function getAppliance(_id: string) {
  const url = `http://127.0.0.1:8080/api/appliance/${_id}/`;
  const { data } = await axios.get(url);
  // console.log(data);
  return data.appliance;
}

export async function getAllAppliances(page: number) {
  const url = `http://127.0.0.1:8080/api/appliance/`;
  const { data } = await axios.get(url);
  // console.log(data);
  return data.appliance;
}

export async function updateAppliance(
  _id: string,
  powerState: boolean,
  deviceName: string
) {
  const url = `http://127.0.0.1:8080/api/appliance/${_id}`;
  const { data } = await axios.put(url, {
    powerState: powerState,
    deviceName: deviceName,
  });
  // console.log(data);
  return data.appliance;
}

export async function createAppliance(deviceName: string, powerState: boolean) {
  console.log(`creating appliance`);
  const url = `http://127.0.0.1:8080/api/appliance/`;
  const { data } = await axios.post(url, {
    powerState: powerState,
    deviceName: deviceName,
  });
  // console.log(data);
  return data.appliance;
}

export async function deleteAppliance(_id: string) {
  const url = `http://127.0.0.1:8080/api/appliance/${_id}`;
  const { data } = await axios.delete(url);
  // console.log(data);
  return data.appliance;
}
