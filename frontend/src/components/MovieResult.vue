<template>
  <div class="flex flex-row justify-center">
    <div
      class="flex flex-col align-center justify-center shadow bg-gray-500"
    >
      <div class="text-center">
        <h2 class="mt-4 font-bold">The people have spoken!</h2>
      </div>
      <div class="flex md:flex-row">
        <img
          src="https://image.tmdb.org/t/p/w500/iXbWpCkIauBMStSTUT9v4GXvdgH.jpg"
          class="max-h-full p-4"
          alt=""
        />
        <div class="p-4 text-left">
          <h3>The Suicide Squad</h3>
          <p>Year of release: 2021</p>
          <p>Watch on</p>
          <a href="">Netflix</a> | <a href="">Amazon Prime</a> |
          <a href="">Hulu</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Movie from '../models/movie'

export default defineComponent({
  name: 'MovieResult',
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