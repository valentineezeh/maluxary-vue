<script setup lang="ts">
import { CartItem } from '@/types';

  defineProps<{
    order: CartItem
  }>()
</script>

<template>
   <div class="cart-item" >
      <div class="cart-item-name">
        <img :src="`${order.image_url}`" />
        <div class="cartCountContainer">
          <span>{{ order.quantity }}</span>
        </div>
      <div>
        <h3>{{ order.title }}</h3>
        <p>ID: {{ order.id }}</p>
      </div>
      </div>
      <p>{{ order.price }}</p>
    </div>
</template>

<style lang="css" scoped>
  .cart-item-name {
    display: flex;
    align-items: center;
  }
  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .cartCountContainer {
    position: relative;
    height: 20px;
    width: 20px;
    border-radius: 100px;
    background-color: #525850;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    bottom: 25px;
    right: 10px;
  }
  .cart-summary-container img {
    width: 50px;
    height: 50px;
  }
</style>