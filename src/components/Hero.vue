<script setup></script>

<template>
  <section class="tile">
    <div class="main-text">
      <h1>HERO</h1>
      <h3>HERO SUBTEXT</h3>
    </div>

    <img
      src="https://pbs.twimg.com/media/Fxjd6DjaUAA3Yqa?format=jpg&name=small"
      alt="image"
    />
    <!-- add smth else here later -->
  </section>
</template>

<style scoped>
.tile {
  display: flex;
  justify-content: space-around;
  height: 90vh;
  align-items: center;
  background-color: lightgray;
}

.main-text {
  text-align: center;
}

img {
    height: 300px;
}
</style>
