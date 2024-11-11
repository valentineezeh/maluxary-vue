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
    <a href="/" class="logoText"> E-Commerce</a>
    <div class="rightnav">
      <a href="#news">Account</a>
      <a href="#" @click="store.setSidePanel(true)" class="cart">
        <i class="fa-solid fa-cart-shopping" style="cursor: pointer;"></i>
        <span class="cartCount" v-if="store.cartItemCount > 0">{{
          store.cartItemCount
        }}</span>
      </a>
    </div>
  </div>
</template>

<style scope>
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
