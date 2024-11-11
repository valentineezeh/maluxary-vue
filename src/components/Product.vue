<script setup lang="ts">
import type { ProductTypes } from '../types'
import { useStore } from '@/stores'

const { product } = defineProps<{
  product: ProductTypes
}>()

const store = useStore()
const { addToCart, setSidePanel } = store

const handleAddToCart = (product: ProductTypes) => {
  addToCart(product)
  setSidePanel(true)
}
</script>

<template>
  <div class="container">
    <img :src="`${product.image_url}`" alt="prod1" />
    <div class="prod-title">
      <p>{{ product.title }}</p>
    </div>

    <p>
      <span class="price-text">Price:</span>
      {{ product.price }}
    </p>

    <div class="add-btn">
      <button @click="handleAddToCart(product)">Add to cart</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.price-text {
  font-weight: bold;
}

.prod-img {
  display: flex;
}

.container img {
  height: 100px;
  width: 100px;
  /* box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25); */
}

.prod-title {
  width: 150px;
  text-align: center;
  height: 80px;
}

.add-btn button {
  background-color: #525850;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
