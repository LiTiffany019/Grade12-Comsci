<script setup>
import { ref } from "vue";
import axios from "axios";
// import TMDB_API_KEY from ".key.js"


//`https://api.themoviedb.org/3/movie/${movieSelect.value}?api_key=${TMDB_API_KEY}&language=en-US`
console.log(4);

const getMovie = async (url) => {
    const movieData = await axios.get(url).data
};

//need a null value or smth

// const getMovie = () =>{
//   console.log("got movie");
//   console.log(movieSelect.value);
// }

</script>

<template>
  <header>
    <select id="movieSelect">
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

    <button @click="getMovie()">Get</button>
  </header>
</template>

<style scoped></style>
