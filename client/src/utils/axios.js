import axios from "axios";

export default axios.create({
  baseURL: "https://couple-goals-new.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
