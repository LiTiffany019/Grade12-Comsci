<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const GoToLogin = () => {
  router.push("/Login");
};
</script>

<template>
  <div class="header-container">
    <h1 id="brand">Totally Legit Movie Inc.</h1>
    <button @click="GoToLogin()">Login</button>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 3rem;
  background-color: black;
  font-size: 125%;
}

#brand {
    color: white;
    text-align: center;
    padding-left: 5rem;

}
button {
  padding: 0.5rem;
  width: 4rem;
  margin-top: 1rem;
  margin-right: 2.5rem;
}
</style>
