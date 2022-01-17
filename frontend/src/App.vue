<template>
  <div class="container p-4 mx-auto text-center h-screen">
    <div class="h-full">
      <h1>🎬 Cinagree 🎬</h1>
      <MovieMatching />
    </div>
  </div>
  <!--  <div class="container mx-auto text-center bg-black h-screen">-->
  <!--    <div class="bg-blue h-full">-->
  <!--      <img src="https://image.tmdb.org/t/p/w500/iXbWpCkIauBMStSTUT9v4GXvdgH.jpg" class="h-full" alt="">-->
  <!--    </div>-->
  <!--  </div>-->
  <!-- <MovieMatching /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MovieMatching from './views/MovieMatching.vue'

export default defineComponent({
  name: 'App',
  components: {
    MovieMatching,
  },
})
</script>

<style>
body {
  @apply bg-gray-400 text-white font-serif
  /*background: #5a5a5a;*/
  /*padding: 0;*/
  /*margin: 0;*/
  /*box-sizing: border-box;*/
  /*overflow: hidden;*/;
}

#app {
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin: 0;*/
  /*padding: 0;*/
  /*height: 100vh;*/
  /*width: 100vw;*/
  @apply text-white;
}
</style>
