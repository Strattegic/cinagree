<template>
  <div>
    It's a Match!
    <img :src="movie.imageUrl" class="match-poster" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Movie from '../models/movie'

export default defineComponent({
  name: 'MovieMatched',
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true
    },
  },
  data: () => {
    return {}
  },
})
</script>

<style scoped>
  .match-poster {
    height: 400px;
  }
</style>