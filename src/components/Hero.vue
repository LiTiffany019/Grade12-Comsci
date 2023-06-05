<script setup></script>

<template>
  <section class="tile">
    <div class="text">
      <h1>
        A totally legitimate movie source that cares about you and your movie
        nights
      </h1>
      <h3>
        Why watch movies in theatres when you can sit in your room and
        watch the latest movies all by youself
      </h3>

      <p> Officially sponsered by absolutely nobody</p>
    </div>
  </section>
</template>

<style scoped>
.tile {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90vh;
  align-items: center;
  background-image: linear-gradient(to bottom, black, rgb(32, 32, 32));
  background-image: url("https://easyhometheater.net/wp-content/uploads/2022/10/photo-1579036095242-fe07594274ca.jpeg-1024x791.webp");

}

.text {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  padding-top: 10rem;
  width: 40%;
  color: white;
}


</style>
