import axios from "axios";

// add common axios props
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
