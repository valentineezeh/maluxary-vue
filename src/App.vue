<script setup lang="ts">
import Home from './views/HomeView.vue'
import Loader from './components/common/Loader.vue'
</script>

<template>
  <Suspense>
    <template #fallback>
      <Loader />
    </template>
    <template #default>
      <Home />
    </template>
  </Suspense>
</template>
