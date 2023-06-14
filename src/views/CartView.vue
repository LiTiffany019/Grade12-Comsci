<script setup>
import { useRouter } from "vue-router";
import { useMovieStore } from "../store/index.js";

const store = useMovieStore();
const router = useRouter();

const rmFromCart = (movie) => {
  const index = store.cart.indexOf(movie);
  store.rmFromCart(index);
}

const goBack = () => {
  router.push("/purchase");
};
</script>

<template>
  <div class="cart-page">
    <div class="page-container">
      <section class="misc">
        <div class="text">
          <h1>Your Cart</h1>
          <br />
          <h3>You selected the following movies:</h3>
        </div>
        <button @click="goBack()" id="back-button">Go back to purchase page</button>
      </section>

      <div class="movie-container">
        <div v-for="movie in store.cart" class="movie">
          <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster}`" />
          <h2 id="movie-title">{{ movie.title }}</h2>
          <button @click="rmFromCart(movie)">Remove from cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.page-container {
  margin: 0;
  padding: 0;
  background-color: rgb(32, 32, 32);
}

.misc,
#movie-title {
  color: white;
  padding: 1rem;
  text-align: center;
}

.movie-container {
  display: flex;
  flex-wrap: wrap;
}

img {
  width: 20vw;
}

.movie {
  padding: 1rem;
  margin: 1rem;
}

.cart-page {
  height: 100vh;
  background-color: rgb(32, 32, 32);
}

#back-button {
  margin: 2rem;
  background-color: rgb(71, 71, 71);
  color: rgb(224, 224, 224);
}
</style>
