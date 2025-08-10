import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`, // Make sure this is the backend URL
});

export default instance;
