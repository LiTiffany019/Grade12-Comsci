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
const loginEmail = ref("");
const loginPass = ref("");
const router = useRouter();
const store = useMovieStore();

const registerViaEmail = async () => {
  try {

 
  if (passwordOne.value !== passwordTwo.value) {
    alert("Passwords do not match, please try again");
    return;
  }

  const { user } = await createUserWithEmailAndPassword(
    auth,
    email.value,
    passwordOne.value
  );
  store.user = user;
  router.push("/purchase");
} catch (error) {
  alert("Password must be at least 6 characters long, please try again")
}
};

const loginViaEmail = async () => {
  try {
    const { user } = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPass.value
    );
    store.user = user;
    router.push("/purchase");
  } catch (error) {
    alert("Incorrect email or password, please try again");
  }
};

const registerViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);
  const firestoreCart = await getDoc(doc(firestore, "carts", user.email));
  store.user = user;
  console.log(store.user);
  if (firestoreCart.exists()) {
    const { cart } = firestoreCart.data();
    store.cart = cart;
  }
  router.push("/purchase");
  };
</script>

<template>
  <div class="login-container">
    <h2 class="text">Please login:</h2>

    <section class="form-info">

      <div id="login-via-email">
        <h1>Login via Email</h1>
        <form class="login" @submit.prevent="loginViaEmail()">
          <input v-model="loginEmail" type="email" placeholder="Email" />
          <input v-model="loginPass" type="password" placeholder="Password" />
          <input type="submit" value="Login" />
        </form>

        <!-- <h3 v-if="wrongInfo" class="incorrect">
        Incorrect username or password, please try again.
      </h3> -->
      </div>

      <div id="reg-via-email">
        <h1>Register via Email</h1>
        <form @submit.prevent="registerViaEmail()">
          <input v-model="email" type="email" placeholder="Email" />
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
        <h1>Register via Google</h1>
        <button @click="registerViaGoogle()">Sign in with Google</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-container {
  background-color: rgb(10, 10, 10);
  /* height: 75vh; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 16%;
  /* padding-bottom: 0; */
  text-align: center;
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

form {
  gap: 1rem;
}

.form-info {
  gap: 2rem;
}

h1 {
  margin-bottom: 1rem;
}
</style>
