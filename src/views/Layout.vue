<script setup lang="ts">
import Nav from '../components/common/Nav.vue'
import SideBar from '../components/common/SideBar.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <Nav />
  <SideBar />
  <RouterView />
  <Footer />
</template>