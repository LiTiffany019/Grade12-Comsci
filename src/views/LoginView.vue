<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";

const email = ref("");
const passwordOne = ref("");
const passwordTwo = ref("");

const router = useRouter();

const username = ref("");
const password = ref("");
const wrongInfo = ref(false);

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Brozzzzz..... Yer Paswerdz not coolz!");
    return;
  }

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordOne.value
  );
  store.user = user;
  router.push("/purchase");
};

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      email.value,
      passwordOne.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    console.log(error);
  }
};

const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
  store.cart = cart;
  router.push("/purchase");
};

</script>

<template>
  <div class="login-container">
    <h2 class="text">Please login:</h2>
    <section class="form-info">
      <form @submit.prevent="login()">
        <input type="text" v-model="username" placeholder="username" />
        <input type="password" v-model="password" placeholder="password" />
        <input type="submit" value="login" />
      </form>
      <h3 v-if="wrongInfo" class="incorrect">
        Incorrect username or password, please try again.
      </h3>
    </section>
  </div>
</template>

<style scoped>
.login-container {
  background-color: rgb(10, 10, 10);
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 20%;
  padding-bottom: 0;
}

.text {
  color: white;
  text-align: center;
}

.form-info,
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: white;
}
</style>
