<script setup>
import { ref } from "vue";
import axios from "axios";

//`https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US`

const movieSelect = ref("");
const movieData = ref(null);

const getMovie = async () => {
  console.log(import.meta.env.VITE_TMDB_API_KEY);
  movieData.value = (await axios.get(
    `https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&adult=false`
  )).data;

  console.log(movieData.value);
};

let durationHrs = movieData.runtime / 60;
let durationMins = movieData.runtime % 60;
// let durationTotal = durationHrs + " hrs" + durationMins + " min";
//work on formatting of this
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

    <button @click="getMovie">Get</button>
  </header>

  <section v-if="movieData" class="movieTile">
    <h1>{{ movieData.original_title }}</h1>
    <h3>Original Language: {{ movieData.original_language }}</h3>
    <h4>Description: {{ movieData.overview }}</h4>
    <h3>Date of Release: {{ movieData.release_date }}</h3>
    <h4>{{ durationHrs }} hrs {{ durationMins }} mins</h4>
    <h4>{{ movieData.vote_average }} / 10</h4>

    <img src=" `https://image.tmdb.org/t/p/w500/${}`" alt="">
    
  </section>
</template>

<style scoped></style>


