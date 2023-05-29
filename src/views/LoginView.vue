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
    <form @submit.prevent="login()">
      <input type="submit" value="login" />
      <input type="text" v-model="username" placeholder="username" />
      <input type="password" v-model="password" placeholder="password" />
    </form>
    <h3 v-if="wrongInfo" class="incorrect">
      Incorrect username or password, please try again.
    </h3>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
</style>
