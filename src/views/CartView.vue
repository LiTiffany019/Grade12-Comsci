<script setup>
import { useMovieStore } from "../store/index.js";

const store = useMovieStore();
</script>

<template>
  <div class="container">
    <section class="misc">
       <h1>Cart</h1> 

    </section>
    
    <div v-for="movie in store.cart" class="movie-list">
      <h1>{{ movie.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
    </div>
  </div>
</template>

<style>
.container {
  margin: 0;
  padding: 0;
  background-color: rgb(32, 32, 32);
}

.misc {
  color: white;
  margin: 1rem;

}

</style>