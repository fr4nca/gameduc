import axios from "axios";
import config from "./keys";

export default axios.create({
  baseURL: config.apiUrl
});
