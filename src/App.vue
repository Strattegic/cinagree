<template>
  <h1>🎬 Cinagree™ 🎬</h1>
  <MovieMatching />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MovieMatching from "./components/MovieMatching.vue";

export default defineComponent({
  name: "App",
  components: {
    MovieMatching,
  },
});
</script>

<style>
  body {
    background: #5a5a5a;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
