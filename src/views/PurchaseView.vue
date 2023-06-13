
<!-- <style scoped>
.tiles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

img {
  width: 200px;
}

.pagination {
  display: flex;
  gap: 1rem;
}

.controls {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>  -->





<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";

const router = useRouter();
const genre = ref(28);
const search = ref("");
const movies = ref(null);
const page = ref(1);
const currentURL = ref("");
const totalPages = ref(0);
const showModal = ref(false);
const selectedRecordId = ref(0);

const toggleModal = (id) => {
  showModal.value = !showModal.value;
  selectedRecordId.value = id;
};

const getTMDBData = async (url, options, page) => {
  movies.value = (
    await axios.get(url, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
        region: "US",
        language: "en",
        include_adult: false,
        page,
        ...options,
      },
    })
  ).data;
  totalPages.value = movies.value.total_pages;
  currentURL.value = url;
};

// console.log(movieStore.movies);
</script>

<template>
  <section class="options">
    <div>
      <input type="search" placeholder="Enter search items" v-model="search" />
      <button
        @click="
          getTMDBData('https://api.themoviedb.org/3/search/movie', {
            query: search,
          })
        "
      >
        Search
      </button>
    </div>
  </section>
  <div>
    <select v-model="genre">
      <option value="28">Action</option>
      <option value="10751">Family</option>
      <option value="878">Science Fiction</option>
      <option value="12">Adventure</option>
      <option value="14">Fantasy</option>
    </select>
    <button
      @click="
        getTMDBData('https://api.themoviedb.org/3/discover/movie', {
          with_genres: genre,
        })
      "
    >
      Get
    </button>
    <button @click="router.push('/cart')">Cart</button>
  </div>

  <div v-if="movies" class="tiles">
    <div v-for="movie in movies.results" :key="movie.id" class="tile">
      <img
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        @click="toggleModal(movie.id)"
      />
    </div>
  </div>
  <Modal v-if="showModal" :id="selectedRecordId" @toggleModal="toggleModal()" />
</template>

<style scoped>
* {
  background-color: rgb(10, 10, 10);
  margin: 0;
  padding: 0;
}

/* .container {
  color: white;
  height: 100vh;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: repeat(5, 1fr);
} */

img {
  /* width: 70%;
  margin: 1rem;
  border-style: solid;
  border-color: white;
  border-radius: 1%; */

  width: 100px;
}

.options,
button,
input,
select {
  /* padding: 2rem; */
  display: flex;
  justify-content: space-between;
  color: white;
}

/* #cart-button {
  color: white;
  padding: 1rem;
  margin-right: 6rem;
  background-color: rgb(70, 70, 70);
} */
</style>
