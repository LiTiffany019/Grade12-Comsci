<script setup>
import { ref } from "vue";
import axios from "axios";
// import TMDB_API_KEY from src/key.js


//`https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US`

const movieSelect = ref("");
const movieData = ref(null);

const getMovie = async () => {
  // const movieID = movieSelect.value;
  movieData.value = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US&adult=false`
  ).data;
  //why doesnt it work when i put .data ?????????????
  console.log(movieData.value);
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

    <button @click="getMovie">Get</button>
  </header>

  <div v-if="movieData" class="movieTile">
    <p>{{ movieData.original_title }}</p>
    <p>hi</p>
    <!-- <img src="" alt=""> use v-bind shortcut :-->
    
  </div>
</template>

<style scoped></style>


