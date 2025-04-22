// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // or process.env.REACT_APP_API_BASE_URL in CRA
  withCredentials: true, // send cookies automatically
});

export default axiosClient;

