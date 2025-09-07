import axios from "axios";

const BackendAPI = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default BackendAPI;
