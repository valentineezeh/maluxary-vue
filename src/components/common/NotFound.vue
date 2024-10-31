<script setup lang="ts">
import { defineProps } from 'vue'

  const props = defineProps<{
    text: string
  }>()

  console.log('props >>>>> ', props.text)
</script>

<template>
  <div class="not-found-container">
    <h1 style="color: #525850">{{ props.text }}.</h1>
  </div>
</template>

<style lang="css" scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100vw;
}

.not-found-container h1 {
  margin: 0;
}

.not-found-container {
  width: 100%;
}
</style>