import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://finekittens-us.backendless.app/api",
});
