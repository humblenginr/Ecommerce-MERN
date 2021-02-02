import axios from "axios";
import { baseUrl } from "./baseUrl";





export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: { 'Content-Type': 'application/json', }
})


// export function authorize(token) {
//     axiosInstance.defaults.headers.common['Authorization'] = `Token ${token}`;
// }