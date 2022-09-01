import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://52.230.104.188:3917",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
export default apiClient;
