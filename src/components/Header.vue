<script setup>
import { useRouter} from "vue-router";

const router = useRouter();
const login = () => {
    router.push("/login");
};
</script>

<template>
    <header class="company-name">
        <h1>Totally Legit Movie Inc.</h1>
    </header>
    
</template>

<style scoped>

.company-name {
    text-align: center;
    padding: 3rem;
    background-color: blue;
    font-size: 125%;

}
</style>
