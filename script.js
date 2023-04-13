import { TMDB_API_KEY } from "./key.js";

const getTMDBData = async (url) => {
  return (await axios.get(url)).data;
};

const createMovieTile = (id, poster, title, date, rating, genres, runtime, collection, description) => {
  const tile = document.createElement("div");

  const details = document.createElement("div");

  const img = document.createElement("img");
  const movieTitle = document.createElement("h1");
  const dateReleased = document.createElement("h2");
  const movieRating = document.createElement("h3"); 
  const movieGenres = document.createElement("div");///////////////
  const duration = document.createElement("h3");
  const movieCollection = document.createElement("h3");
  const movieDescription = document.createElement("h4");
  const trailerButton = document.createElement("button");

  tile.classList.add("tile");
  img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
  movieTitle.innerText = title;
  
    let genresArray = [];
    for (let i = 0; i < genres.length; i++) {
      genresArray[i] = ` ${genres.at(i).name}`;
      console.log(genresArray);
    }
  
    movieGenres.innerText = "Genre(s): " + genresArray;

  dateReleased.innerText = date;
  movieRating.innerText = "Rating: " + rating + "/10";
  duration.innerText = "Movie duration: " + runtime + " minutes";
  
  !collection
    ?movieCollection.innerText = "This movie is currently not part of a collection."
    :movieCollection.innerText = collection;
  
  
  movieDescription.innerText = description;
  trailerButton.innerText = "Trailer";

  details.append(movieTitle);
  details.append(movieGenres);/////////////////////////
  details.append(dateReleased);
  details.append(movieRating);
  details.append(duration);
  details.append(movieCollection);
  details.append(movieDescription);

  console.log(tile);
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
      console.log(trailer.at(0).key);
      console.log(trailer);
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

  // let genresArray = [];
  // for (let i = 0; i < movieData.genres.length; i++) {
  //   genresArray = movieData.genres.at(i).name;
  //   //console.log[movieData.genres.at(i).name];
  //   console.log(genresArray);
  // }
  const tile = createMovieTile(
    movieData.id,
    movieData.poster_path,
    movieData.title,
    movieData.release_date,
    movieData.vote_average,
    movieData.genres,///////////////
    movieData.runtime,
    movieData.genresArray,
    movieData.overview
  );
    //console.log(movieData.belongs_to_collection);////returns object object
    
    // movieData.genres.filter((genres) => {
    //   // return genres.type === "genre";
    // })


    // for (let i = 0; i < movieData.genres.length; i++) {
    //   // console.log(movieData.genres.at(i).name);
    //   const genresArray = [movieData.genres.at(i).name];
    // }
    

  movieDisplay.replaceChildren(tile);
});

//jaws: 578 spiderm: 429617 ironman2: 10138 avatar: 76600 Shrek: 808 puss:315162 super mario: 502356 httyd: 166428 up: 14160 star wars: 11

//country of origin?
