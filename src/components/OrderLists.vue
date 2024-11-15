<script setup lang="ts">
import OrderItem from './OrderItem.vue';
import { useStore } from '@/stores';
import Button from '@/components/common/Button.vue';

const store = useStore()

const tax = (store.cartSubtotal * 5) / 100
const total = store.cartSubtotal + tax

</script>

<template>
  <div class="main-container">
    <h3>Order summary</h3>
    <div class="cart-summary-container">
      <div :order="order" v-for="order in store.getCart" :key="order.id">
      <OrderItem :order="order" />
    </div>
    <div class="vertical-line" />
    <div class="subtotal-container">
      <div class="subtotal-price">
        <p class="subtotal-text">Subtotal</p>
        <p>{{ store.cartSubtotal }}</p>
      </div>
      <!-- <div class="subtotal-price">
        <p class="subtotal-text">Shipping</p>
        <p>Not available at the moment</p>
      </div> -->
      <div class="subtotal-price">
        <p class="subtotal-text">Tax</p>
        <p>5%</p>
      </div>
      <div class="subtotal-price">
        <p class="subtotal-text">Total</p>
        <p>{{ total }}</p>
      </div>
      <Button
        :text="'Confirm order'"
        :disabled="store.getCart.length === 0"
        :customStyle="{
          color: 'white',
          backgroundColor: '#525850',
        }"
      />
    </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.subtotal-text {
  font-weight: bold;
}
.vertical-line {
  width: 100%;
  height: 1px;
  background-color: #ccc;
}
.subtotal-price {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.subtotal-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
}
.main-container{
  width: 45%;
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
.cart-summary-container {
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  /* padding: 10px; */
}
</style>