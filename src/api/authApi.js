import axios from "axios";

const authApi = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
  params: { key: process.env.VUE_APP_AUTH_API_KEY },
});

export default authApi;
