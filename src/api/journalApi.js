import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://vue-db-92383-default-rtdb.firebaseio.com",
});

export default journalApi;
