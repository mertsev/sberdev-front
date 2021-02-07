import axios from 'axios'

export interface Appliance {
    _id: string;
    deviceName: string;
    powerState: boolean;
}

export async function getAppliance(_id: string) {
    const url = `http://127.0.0.1:8080/api/appliance/${_id}/`
    const { data } = await axios.get(url);
    console.log(data);
    return data.appliance;
}