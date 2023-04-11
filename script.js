import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (id, poster, title, date, description) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");
  const img = document.createElement("img");
  const h1 = document.createElement("h1");
  const h3 = document.createElement("h3");
  const h4 = document.createElement("h4");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  h1.innerText = title;
  h3.innerText = date;
  h4.innerText = description;
  trailerButton.innerText = "Trailer";

  // let movieSelect = document.getElementById("movieSelect");

  details.append(h1);
  details.append(h3);
  details.append(h4);

  tile.append(img);
  tile.append(details);
  tile.append(trailerButton);

  return tile;
};

const button = document.getElementById("button");

button.addEventListener("click", async () => {
  console.log(movieSelect.value);

  const movieSearch = await getTMDBData(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${movieSelect.value}&include_adult=false`
  );

  let firstResult = movieSearch.results[0]; /////////////////////////

  const selectedMovieData = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${firstResult.id}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  console.log(firstResult.id);
  console.log(selectedMovieData);

  const tile = createMovieTile(
    firstResult.id,
    firstResult.poster_path,
    firstResult.title,
    firstResult.release_date,
    firstResult.overview
  );

  // movieSearch.results[0] = (movie) => {
  //   const tile = createMovieTile(
  //     movie.id,
  //     movie.poster_path,
  //     movie.title,
  //     movie.release_date,
  //     movie.overview
  //   );
  movieInfo.appendChild(tile);
});
//   const trailer = trailerData.results.filter((trailer) => {
//     return trailer.type === "Trailer";
//   });

//   !trailer.length
//     //show an h1 that says sorry no trailer
// })

// return tile;
