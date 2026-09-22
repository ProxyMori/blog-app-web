import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "VITE_BASE_URL_API",
});
