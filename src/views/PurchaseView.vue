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

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedId.value = id;
};

const goToCart = () => {
  router.push("/Cart");
};

const movies = (
  await axios.get("https://api.themoviedb.org/3/trending/movie/day?", {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;

movieStore.movies = movies.results.map((movie) => {
  return {
    id: movie.id,
    poster: movie.poster_path,
  };
});

console.log(movieStore.movies);
</script>

<template>
  <section class="options">
    <h1 class="text">Trending Movies: </h1>
    <button id="cart-button" @click="goToCart()">View Cart</button>
  </section>

  <div class="container" v-if="movieStore.movies">
    <div class="movies" v-for="movie in movieStore.movies">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`"
        alt="movie"
        @click="toggleModal(movie.id)"
      />
    </div>

    <Modal v-if="showModal" :id="selectedId" @toggleModal="toggleModal()" />
  </div>
</template>

<style scoped>
* {
  background-color: rgb(10, 10, 10);
  margin: 0;
  padding: 0;
}

.container {
  color: white;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
}

img {
  width: 70%;
  margin: 1rem;
  border-style: solid;
  border-color: white;
  border-radius: 1%;
}

.options {
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  
}

#cart-button {
  color: white;
  padding: 1rem;
  margin-right: 6rem;
  background-color: rgb(70, 70, 70);
}
.text {
  color: white;
}
</style>
