<script setup lang="ts">
import { useStore } from '@/stores'

// const props = defineProps<{
//   onShowSidePanel: () => void
//   showSidePanel: boolean
// }>()

const store = useStore()
</script>

<template>
  <div class="topnav">
    <a href="/" class="logoText">
      <p>MAOLUXURY</p>
    </a>
    <div class="rightnav">
      <a href="#news">Account</a>
      <a href="#" @click="() => store.setSidePanel(true)" class="cart">
        <i class="fa-solid fa-cart-shopping" style="cursor: pointer;"></i>
        <span class="cartCount" v-if="store.cartItemCount > 0">{{
          store.cartItemCount
        }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap');

.topnav {
  overflow: hidden;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  height: 60px;
}
.logoText {
  display: flex;
  align-items: center;
  color: #525850;
  text-decoration: none;
  cursor: pointer;
}
.logoText p {
  font-size: 34px;
  /* font-weight: bold; */
  font-family: 'Oxygen', sans-serif;
  letter-spacing: 20px;
}
.cartCount {
  height: 10px;
  width: 10px;
  border-radius: 100px;
  position: relative;
  bottom: 10px;
  right: 0px;
  color: #525850;
  font-weight: 600;
}
</style>
