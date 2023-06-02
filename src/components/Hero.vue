<script setup></script>

<template>
  <section class="tile">
    <div class="main-text">
      <h1>HERO</h1>
      <h3>HERO SUBTEXT</h3>
    </div>

    <div class="image-container">
      <img
        src="https://pbs.twimg.com/media/Fxjd6DjaUAA3Yqa?format=jpg&name=small"
        alt="image"
      />
      <p>Placeholder image^^</p>
    </div>
    <!-- add smth else here later -->
  </section>
</template>

<style scoped>
.tile {
  display: flex;
  justify-content: space-around;
  height: 90vh;
  align-items: center;
  background-color: rgb(104, 104, 104);
}

.main-text {
  text-align: center;
}

img {
  height: 300px;
}
</style>
