<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Product from './Product.vue'
import { useStore } from '../stores'

const store = useStore()
const { searchResults } = storeToRefs(store)
</script>

<template>
  <section class="container">
    <div class="product-grid">
      <div v-for="product in searchResults" :key="product.id">
        <Product :product="product" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  margin: 50px auto;
  padding: 0 15px;
  max-width: 1800px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 80px;
}
</style>
