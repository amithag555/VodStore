import axios from "axios";

export default axios.create({
  baseURL: `https://www.omdbapi.com/?apikey=214361b8&`,
});
