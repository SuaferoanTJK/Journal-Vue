import axios from "axios";

const journalApi = axios.create({
  baseURL: `https://${process.env.VUE_APP_FIREBASE_RTDB_NAME}-default-rtdb.firebaseio.com`,
});
journalApi.interceptors.request.use((config) => {
  config.params = {
    auth: localStorage.getItem("idToken"),
  };
  return config;
});

export default journalApi;
