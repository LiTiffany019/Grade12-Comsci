<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const wrongInfo = ref(false);

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("/Purchase");
  } else {
    wrongInfo.value = true;
  }
};
</script>

<template>
  <div class="login-container">
    <h2 class="text">Please login:</h2>
    <form @submit.prevent="login()">
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
      <input type="submit" value="login" />
    </form>
    <h3 v-if="wrongInfo" class="incorrect">
      Incorrect username or password, please try again.
    </h3>
  </div>
</template>

<style scoped>
.login-container {
  background-color: rgb(45, 45, 155);
  /* height: 100vh; */
  display: flex;

}

.text {
  color: white;

}
form {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  gap: 1rem;
  transform: translateY(500%);
  
}
</style>
