import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (
  id,
  poster,
  title,
  date,
  rating,
  genres,
  runtime,
  collection,
  description,
  language
) => {
  const tile = document.createElement("div");
  const details = document.createElement("div");

  const img = document.createElement("img");
  const movieTitle = document.createElement("h1");
  const dateReleased = document.createElement("h3");
  const movieRating = document.createElement("h3");
  const movieGenres = document.createElement("h3");
  const duration = document.createElement("h3");
  const movieCollection = document.createElement("h3");
  const movieDescription = document.createElement("h4");
  const movieLanguage = document.createElement("h3");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  details.classList.add("details");

  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  movieTitle.innerText = title;
  dateReleased.innerText = `Date released: ${date}`;
  movieRating.innerText = "Rating: " + rating + "/10";
  duration.innerText = "Movie duration: " + runtime + " minutes";
  movieDescription.innerText = `Description: 
  ${description}`;
  movieLanguage.innerText = `Original language: ${language}`;
  trailerButton.innerText = "Trailer";

  //movie genres
  let genresArray = [];
  for (let i = 0; i < genres.length; i++) {
    genresArray[i] = ` ${genres.at(i).name}`;
  }
  movieGenres.innerText = "Genre(s): " + genresArray;

  //collection
  !collection
    ? (movieCollection.innerText =
        "This movie is currently not part of a collection.")
    : (movieCollection.innerText = `This movie belongs to the: ${collection.name}`);

  details.append(movieTitle);
  details.append(trailerButton);
  details.append(movieGenres);
  details.append(movieLanguage);
  details.append(dateReleased);
  details.append(movieRating);
  details.append(duration);
  details.append(movieCollection);
  details.append(movieDescription);

  tile.append(img);
  tile.append(details);

  trailerButton.addEventListener("click", async () => {
    const trailerData = await getTMDBData(
      `https://api.themoviedb.org/3/movie/${movieSelect.value}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const trailer = trailerData.results.filter((trailer) => {
      return trailer.type === "Trailer";
    });

    !trailer.length
      ? alert("There are no trailors for this film.")
      : window.open(`https://www.youtube.com/watch?v=${trailer.at(0).key}`);
  });

  return tile;
};

let movieSelect = document.getElementById("movieSelect");
const getMovieButton = document.getElementById("getButton");

getMovieButton.addEventListener("click", async () => {
  const movieData = await getTMDBData(
    `https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US`
  );
  console.log(movieData);

  const tile = createMovieTile(
    movieData.id,
    movieData.poster_path,
    movieData.title,
    movieData.release_date,
    movieData.vote_average,
    movieData.genres,
    movieData.runtime,
    movieData.belongs_to_collection,
    movieData.overview,
    movieData.original_language
  );

  console.log(tile);
  movieDisplay.replaceChildren(tile);
});
