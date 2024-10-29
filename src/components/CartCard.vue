<script setup lang="ts">
import CounterVue from './Counter.vue'
import { ProductTypes } from '@/types'
import { useStore } from '@/stores'

const props = defineProps<{
  product: ProductTypes
}>()

const store = useStore()
const { removeFromCart } = store

const handleRemoveFromCart = (product: ProductTypes) => {
  removeFromCart(product)
}

console.log('prop.product >>> ', props.product)
</script>

<template>
  <div class="cart-container">
    <div class="cart-header">
      <p>{{ props.product.title }}</p>
      <button v-on:click="handleRemoveFromCart(props.product)">
        <span class="closebtn">X</span>
      </button>
    </div>
    <div class="prod-img">
      <img :src="`${props.product.image_url}`" alt="prodImg" />
    </div>
    <div class="cart-footer">
      <div class="counter-container">
        <CounterVue :product="props.product" />
      </div>
      <div class="prod-price">
        <p>Price: {{ props.product.price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-footer {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}
.counter-container {
  width: 100px;
  height: 40px;
  flex: 0 0 auto;
}
.prod-img {
  position: relative;
  right: 0px;
}

.prod-img img {
  position: absolute;
  right: 0;
  margin-right: 50px;
  width: 40px;
  height: 40px;
}
.cart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 220px;
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.cart-header button {
  color: rgba(0, 0, 0, 0.54);
  background-color: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 50%;
  border: 1px solid #ccc;
}

.cart-header button:hover {
  border-radius: 50%;
  border: 1px solid #cccdcc;
}

.closebtn {
  position: relative;
  top: 0;
  left: 0;
  font-size: 20px;
}
</style>
