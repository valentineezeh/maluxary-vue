<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ProductTypes } from '@/types'
import { useStore } from '@/stores'

const props = defineProps<{
  product: ProductTypes
}>()

const counter = ref(0)

const store = useStore()
const { removeFromCart, addToCart, decrementFromCart } = store

const handleRemoveFromCart = (product: ProductTypes) => {
  if (counter.value >= 1) {
    decrementFromCart(product)
  } else {
    removeFromCart(product)
  }
}

const handleAddToCart = (product: ProductTypes) => {
  addToCart(product)
}

const onHandleIncrement = () => {
  counter.value++
  handleAddToCart(props.product)
}

const onHandleDecrement = () => {
  counter.value--
  handleRemoveFromCart(props.product)
}

onMounted(() => {
  counter.value = props.product.quantity
})

// watch(counter, newVal => (counter.value = newVal))
</script>

<template>
  <div class="counter-container">
    <div class="action-counter" @click="onHandleDecrement">-</div>
    <div>{{ counter }}</div>
    <div class="action-counter" @click="onHandleIncrement">+</div>
  </div>
</template>

<style scoped>
.counter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  gap: 2;
  background: #fff;
  border: 1px solid black;
  border-radius: 3px;
  border: 1px solid #ccc;
  padding: 5px;
}
.action-counter {
  cursor: pointer;
  font-size: 25px;
}
</style>
