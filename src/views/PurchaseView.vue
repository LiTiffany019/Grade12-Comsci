<script setup>
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import axios from "axios";
import { useMovieStore } from "../store/index.js";
import { useRouter } from "vue-router";

const movieStore = useMovieStore();
const router = useRouter();
const selectedId = ref(0);

const showModal = ref(false);
const toggleModal = () => {
  showModal.value != showModal.value;
  selectedId.value = id;
};

// https://api.themoviedb.org/3/trending/movie/day?
const getMovies = (
  await axios.get(`https://api.themoviedb.org/3/trending/movie/day?`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;

console.log(getMovies);
console.log(getMovies.results);

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
  <h2>asdad</h2>
</template>

<style scoped></style>
