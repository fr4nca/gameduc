import axios from "axios";
import config from "../config/keys";

export default axios.create({
  baseURL: config.apiUrl
});
