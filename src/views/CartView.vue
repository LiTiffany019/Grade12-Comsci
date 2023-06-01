<script setup>
import { useStore } from "../store/index.js";

const store = useStore();
</script>

<template>
  <div>
    <div v-for="movie in store.cart">
      <h1>{{ movie.title }}</h1>
      <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
    </div>
  </div>
</template>

<style></style>