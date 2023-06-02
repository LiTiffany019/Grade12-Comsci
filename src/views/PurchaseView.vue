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

const goToCart = () => {
  router.push("/Cart");
};

// https://api.themoviedb.org/3/trending/movie/day?
const movies = (
  await axios.get("https://api.themoviedb.org/3/movie/popular", {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;

console.log(movies);
movieStore.movies = movies.results.map((movie) => {
  return {
    id: movie.id,
    poster: movie.poster_path,
  }
});


console.log(movieStore.id);
</script>

<template>
  <Modal />
  <div class="container">
    <div class="movies">
      <h2>Movie placeholder num1</h2>
      <h2>Movie placeholder num2</h2>
    </div>

    <section class="buttons">
      <button id="cart-button" @click="goToCart()">View Cart</button>
    </section>
  </div>
</template>

<style scoped>
* {
  background-color: rgb(32, 32, 32);
  margin: 0;
  padding: 0;
}
.container {
  color: white;
  height: 100vh;
  display: grid;
  grid-template-rows: 4, 1fr;
  grid-template-columns: 5, 1fr;
}

#cart-button {
  color: white;
}
</style>
