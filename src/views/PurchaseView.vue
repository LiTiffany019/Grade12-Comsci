<script setup>

import Modal from "../components/Modal.vue";
import axios from "axios";
import { useMovieStore } from "../store/index.js";


const movieStore = useMovieStore();

const getMovies = (
    await axios.get (`https://api.themoviedb.org/3/trending/movie/day?language=en-US`, {
        params:  {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            region: "US",
            language: "en",
            include_adult: false,
        }
    })
).data;

movieStore.movies = getMovies.results.map((movie) => {
    return {
        id: movie.id,
        poster: movie.poster_path,
    }
});

console.log(movieStore.id);
</script>

<template>
  <Modal />
  <h1>alskdja</h1>
</template>

<style scoped></style>
