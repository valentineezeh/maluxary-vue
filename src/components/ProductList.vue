<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import Product from './Product.vue'
import { useStore } from '../stores'
import Loader from './common/Loader.vue'
import NotFound from './common/NotFound.vue'


const store = useStore()
const { searchResults, isLoading, error } = storeToRefs(store)

onMounted(async () => {
  const cachedProd = await store.getProductsFromCache()
  if (cachedProd && cachedProd.length === 0) {
    store.initializeStore()
  }
})

</script>

<template>
  <section class="container">
    <Loader v-if="isLoading" />
    <div class="product-grid" v-else-if="searchResults.length !== 0">
      <div v-for="product in searchResults" :key="product.id">
        <Product :product="product" />
      </div>
    </div>
    <div v-else>
      <NotFound :text="error" />
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
