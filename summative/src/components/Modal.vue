<script setup>
import axios from "axios";
import { useMovieStore } from "../store";

const store = useMovieStore();
const props = defineProps(["id"]);

const movie = (
  await axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: import.meta.env.VITE_TMDB_API_KEY,
      region: "US",
      language: "en",
      include_adult: false,
    },
  })
).data;
</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="$emit('toggleModal')">
      <div class="modal-inner-container">
        <button @click="$emit('toggleModal')" id="x-button">X</button>
        <div v-if="movie" class="modal-content">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" />
          <div class="text">
            <h1>{{ movie.title }}</h1>
            <h2>Date released: {{ movie.release_date }}</h2>
            <br />
            <button
              @click="store.addToCart(movie.poster_path, movie.title)"
              id="buy-button"
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-outer-container {
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 5;
}

.modal-outer-container .modal-inner-container {
  background-color: #181818;
  width: clamp(280px, 100%, 900px);
  height: 50vh;
  position: relative;
}

.modal-outer-container .modal-inner-container #x-button {
  position: absolute;
  right: 0px;
  padding: 1rem;
  border: none;
  background: #181818;
  font-weight: bold;
  color: white;
}

.modal-outer-container .modal-inner-container {
  font-size: 1.25rem;
  color: white;
}

img {
  width: 30%;
  margin-top: 0.5rem;
  border-style: solid;
  border-color: white;
  border-radius: 1%;
}

.modal-content {
  display: flex;
  margin: 2rem;
}

.text {
  margin: 2rem;
  margin-top: 0;
}

#buy-button {
  background-color: #acacac;
}
</style>
