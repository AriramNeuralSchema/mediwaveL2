import axios from "axios";
const baseurl = "http://localhost:8080/api";
export default axios.create({
  baseURL: baseurl,
  headers: { "Content-type": "application/json" },
});
