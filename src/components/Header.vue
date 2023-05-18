<script setup>
import { useRouter} from "vue-router";

const router = useRouter();
const GoToLogin = () => {
    router.push("/Login");
};
</script>

<template>
    <div class="header-container">
        <h1>Totally Legit Movie Inc.</h1>
        <button @click="GoToLogin()">Login</button>
    </div>
    
</template>

<style scoped>

.header-container {
    text-align: center;
    padding: 3rem;
    background-color: blue;
    font-size: 125%;
}

button {
    padding: 0.5rem;
    width: 4rem;
    margin-top: 1rem;
}
</style>
