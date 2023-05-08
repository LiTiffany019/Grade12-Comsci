<script setup>
import { ref } from "vue";
import axios from "axios";

//`https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US`

const movieSelect = ref("");
let movieData = ref(null);
let trailerData = ref("");
let durationHrs = ref();
let durationMins = ref();

const getMovieData = async () => {
  // console.log(import.meta.env.VITE_TMDB_API_KEY);
  movieData.value = (
    await axios.get(
      `https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }&language=en-US&adult=false&append_to_response=videos`
    )
  ).data;

  ////trailer

  trailerData = movieData.value.videos.results
    .filter((trailer) => trailer.type === "Trailer")
    .at(0);
  console.log(movieData.value);

  durationHrs = movieData.runtime / 60;
  console.log(durationHrs); //gives NaN
  console.log(movieData.runtime / 60);

  // const movieGenres = movieData.value.genres.name;
  // console.log(movieGenres);
};

const playTrailer = (trailerKey) => {
  window.open(`https://www.youtube.com/embed/${trailerKey}`);
};
</script>

<template>
  <header id="header">
    <h2 id="instructions">Select a Movie From the Following Menu:</h2>
    <select v-model="movieSelect" id="form">
      <option value="508947">Turning Red</option>
      <option value="429617">Spiderman Far From Home</option>
      <option value="10138">Iron Man 2</option>
      <option value="76600">Avatar: The way of Water</option>
      <option value="808">Shrek</option>
      <option value="315162">Puss in Boots: The Last Wish</option>
      <option value="502356">The Super Mario Bros. Movie</option>
      <option value="166428">How to Train Your Dragon: The Hidden World</option>
      <option value="14160">Up</option>
      <option value="11">Star Wars</option>
    </select>

    <button @click="getMovieData" id="getButton">Get</button>
  </header>

  <section v-if="movieData" id="movieTile">
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`"
      alt=""
    />
    <div id="movieInfoText">
      <h1 id="title" class="infoText">{{ movieData.original_title }}</h1>
      <h3 class="infoText">
        Original Language: {{ movieData.original_language }}
      </h3>
      <h4 id="description" class="infoText">
        Description: {{ movieData.overview }}
      </h4>
      <h3 id="releaseDate" class="infoText">
        Date of Release: {{ movieData.release_date }}
      </h3>

      <h4 id="duration" class="infoText">
        Movie duration: {{ movieData.runtime }}
        {{ movieData.runtime % 60 }} mins
      </h4>
      <h4 v-bind="durationHrs" class="infoText">
        Movie duration: hours {{ movieData.runtime / 60 }} {{ durationHrs }}
      </h4>

      <h4 id="rating" class="infoText">
        Movie Rating: {{ movieData.vote_average }} / 10
      </h4>
      <!-- <h4 class="genres" v-for="(name) in items">Genres: {{ name }}</h4> -->
      <h4 class="infoText">{{ movieData.genres[0].name }}</h4>
      <h4
        v-if="!movieData.belongs_to_collection"
        id="collection"
        class="infoText"
      >
        This movie does not belong to a collection
      </h4>
      <h4 v-else id="collection" class="infoText">
        This movie belongs to the {{ movieData.belongs_to_collection.name }}
      </h4>
      <button
        id="trailerButton"
        @click="playTrailer(trailerData.key)"
        class="infoText"
      >
        Watch Trailer
      </button>
    </div>
  </section>
</template>

<style scoped>
* {
  background-color: rgb(23, 33, 85);
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: white;
}

#header {
  padding: 1.5rem;
  text-align: center;
}

#form,
#getButton {
  font-size: 125%;
}

#instructions {
  padding: 1rem;
}

/*  */
#movieTile {
  display: flex;
  gap: 1rem;
  margin: 10vw;
  margin-top: 5vw;
}

.infoText {
  padding: 1rem;
}

#title {
  padding-top: 2rem;
}

#trailerButton {
  margin-left: 1rem;
  font-size: 100%;
  padding: 0.75rem;
}
</style>

<!-- {{ durationHrs }} hrs {{ durationMins }} mins -->
<!-- v-model="durationHrs" -->
