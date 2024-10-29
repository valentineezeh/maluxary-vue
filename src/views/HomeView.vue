<script setup lang="ts">
import { onMounted } from 'vue'
import Nav from '../components/common/Nav.vue'
import SideBar from '../components/common/SideBar.vue'
import Home from '../components/Home.vue'
import { useStore } from '../stores'

const store = useStore()

onMounted(async() => {
  await store.getCartFromCache()
})
</script>

<template>
  <main>
    <Nav />
    <SideBar />
    <Home />
  </main>
</template>
