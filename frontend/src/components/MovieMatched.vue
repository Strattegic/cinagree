<template>
  <div class="flex flex-col align-center text-center max-h-full">
    It's a Match!
    <div class="mx-auto">
      <img :src="movie.imageUrl" class="max-h-full" alt="" />
      <div>{{ movie.title }}</div>
    </div>
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
      required: true,
    },
  },
  data: () => {
    return {}
  },
})
</script>

<style scoped></style>
