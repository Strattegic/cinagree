<template>
  <div>
      <div class="buttons">
        <button @click="voteYay()">😀</button>
        <button @click="voteNay()">😡</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VoteButtons',
  props: {
    vote: {
      type: Boolean,
    },
  },

  methods: {
    voteYay() {
      this.$emit('vote', true)
    },

    voteNay() {
      this.$emit('vote', false)
    },
  },
})
</script>

<style scoped>
.buttons {
  flex: 0 0 100px;
}

.buttons button {
  border-radius: 50%;
  border: 0;
  margin: 0 8px;
  display: inline-block;
  width: 60px;
  line-height: 60px;
  background: #fff;
  font-size: large;
  cursor: pointer;
}

.buttons button:hover {
  background: #ccc;
}
</style>
