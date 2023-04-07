import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async ( "https://api.themoviedb.org/3/movie/550?api_key=8d1f5e1c273227990b9ea9ae53a22f33" ) => {
    return (await axios.get("https://api.themoviedb.org/3/movie/550?api_key=8d1f5e1c273227990b9ea9ae53a22f33")).data;
  };
