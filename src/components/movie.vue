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

  trailerData = movieData.value.videos.results.filter((trailer) => trailer.type === "Trailer").at(0);
  console.log(movieData.value);
  // console.log(trailerData);

  durationHrs = movieData.runtime / 60
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
  <header>
    <select v-model="movieSelect">
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

    <button @click="getMovieData">Get</button>
  </header>

  <section v-if="movieData" class="movieTile">
    <h1>{{ movieData.original_title }}</h1>
    <h3 class="title">Original Language: {{ movieData.original_language }}</h3>
    <h4 class="description">Description: {{ movieData.overview }}</h4>
    <h3 class="releaseDate">Date of Release: {{ movieData.release_date }}</h3>
    
    <h4 class="duration">Movie duration: {{ movieData.runtime}} {{ movieData.runtime % 60}} mins</h4>
    <h4 v-bind="durationHrs"> Movie duration: hours {{ movieData.runtime / 60 }} {{ durationHrs }}</h4>
    
    <h4 class="rating">Movie Rating: {{ movieData.vote_average }} / 10</h4>
    <!-- <h4 class="genres" v-for="(name) in items">Genres: {{ name }}</h4> -->
    <h4>{{ movieData.genres[0].name }}</h4>
    <h4 v-if="!movieData.belongs_to_collection" class="collection">This movie does not belong to a collection</h4>
    <h4 v-else class="collection">This movie belongs to the {{ movieData.belongs_to_collection.name }} </h4>

    <img
      :src="`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`"
      alt=""
    />
    <button id="trailerButton" @click="playTrailer(trailerData.key)">Watch Trailer</button>


  </section>
</template>

<style scoped></style>

<!-- {{ durationHrs }} hrs {{ durationMins }} mins -->
<!-- v-model="durationHrs" -->
