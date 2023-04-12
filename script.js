import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (id, poster, title, date, runtime, description) => {
  const tile = document.createElement("div");

  const details = document.createElement("div");
  const img = document.createElement("img");
  const movieTitle = document.createElement("h1");
  const dateReleased = document.createElement("h2");
  const duration = document.createElement("h3");
  const movieDescription = document.createElement("h4");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  movieTitle.innerText = title;
  dateReleased.innerText = date;
  duration.innerText = "Movie duration: " + runtime + " minutes";
  movieDescription.innerText = description;
  trailerButton.innerText = "Trailer";

  details.append(movieTitle);
  details.append(dateReleased);
  details.append(duration);
  details.append(movieDescription);

  tile.append(img);
  tile.append(details);
  tile.append(trailerButton);

  trailerButton.addEventListener("click", async () => {
    const trailerData = await getTMDBData(
      `https://api.themoviedb.org/3/movie/${movieSelect.value}/videos?api_key=${TMDB_API_KEY}&language=en-US`
    );

    const trailer = trailerData.results.filter((trailer) => {
      return trailer.type === "Trailer";
    });
    console.log(trailer);
    !trailer.length
      ? alert("There are no trailors for this film.")
      : window.open(`https://www.youtube.com/watch?v=${trailer.at(0).key}`);
  });

  return tile;
};

let movieSelect = document.getElementById("movieSelect");
const getMovieButton = document.getElementById("button");

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
    movieData.runtime,
    movieData.overview
  );

  movieDisplay.replaceChildren(tile);
});

// const trailer = trailerData.results.filter((trailer) => {
//   return trailer.type === "Trailer";
// });

//   !trailer.length
//     //show an h1 that says sorry no trailer
// })

//jaws: 578 spiderm: 429617 ironman2: 10138 avatar: 76600 Shrek: 808 puss:315162 super mario: 502356 httyd: 166428 up: 14160 star wars: 11
