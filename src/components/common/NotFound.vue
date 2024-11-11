<script setup lang="ts">

  const props = defineProps<{
    text: string
  }>()
</script>

<template>
  <div class="not-found-container">
    <h1 style="color: #525850">{{ props.text || 'You are yet to add an item to the cart.' }}</h1>
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
  text-align: center;
}

.not-found-container {
  width: 100%;
}
</style>