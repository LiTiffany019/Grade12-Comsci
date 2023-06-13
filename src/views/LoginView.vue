<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMovieStore } from "../store";

import { auth, firestore } from "../firebase";
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
const store = useMovieStore();

const wrongPass = ref("");
const wrongInfo = ref(false);

const registerViaEmail = async () => {
  if (passwordOne.value !== passwordTwo.value) {
    alert("Brozzzzz..... Yer Paswerdz not coolz!");
    // wrongPass.value = "Passwords do not match, please try again"; //////////////////////
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
  console.log(store.user); ///////////
};

const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  store.user = user;
  const { cart } = (await getDoc(doc(firestore, "carts", user.email))).data();
  store.cart = cart;
  router.push("/purchase");
  console.log(store.cart.data); ///////////
};
</script>

<template>
  <div class="login-container">
    <h2 class="text">Please login:</h2>

    <section class="form-info">
      <div id="login-via-email">
        <h1>Login via Email</h1>
        <form class="login" @submit.prevent="loginViaEmail()">
          <input v-model="email" type="email" placeholder="Email" />
          <input v-model="passwordOne" type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>

        <!-- <h3 v-if="wrongInfo" class="incorrect">
        Incorrect username or password, please try again.
      </h3> -->
      </div>

      <div id="reg-via-email">
        <h1>Register via Email</h1>
        <form @submit.prevent="registerViaEmail()">
          <input v-model="email" type="email" placeholder="email" />
          <input
            v-model="passwordOne"
            type="password"
            placeholder="Enter Password"
          />
          <input
            v-model="passwordTwo"
            type="password"
            placeholder="Re-enter Password"
          />
          <input type="submit" value="Register" />
          <!-- <p v-if="wrongPass"> {{ wrongPass }}</p> -->
        </form>
      </div>
      
      <div id="reg-via-google">
        <h1>register via Google</h1>
        <button @click="registerViaGoogle()">Google</button>
      </div>
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
