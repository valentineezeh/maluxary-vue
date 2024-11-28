
<script setup lang="ts">
import { useStore } from '@/stores'
import { useNavigation } from '@/hooks/useNavigation';

const { scrolledNav, mobile, mobileNav, toggleMobileNav } = useNavigation()
const store = useStore()
</script>

<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav>
      <section>
        <a href="/" style="text-decoration: none;" class="branding">MAOLUXURY</a>
      </section>

      <ul v-show="!mobile" class="navigation">
        <li><a href="#account">Account</a></li>
        <li>
          <a href="#about" @click="() => store.setSidePanel(true)" class="cart">
          <i class="fa-solid fa-cart-shopping" />
          <span class="cartCount" v-if="store.cartItemCount > 0">{{
          store.cartItemCount
        }}</span>
        </a></li>
      </ul>

      <section class="icon" @click="toggleMobileNav" v-show="mobile">
        <i
          class="fa-solid"
          :class="mobileNav ? 'fa-xmark' : 'fa-bars'"
        />
      </section>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li><a href="#account">Account</a></li>
          <li>
          <a href="#about" @click="() => store.setSidePanel(true)" class="cart">
          <i class="fa-solid fa-cart-shopping" />
          <span class="cartCount" v-if="store.cartItemCount > 0">{{
          store.cartItemCount
        }}</span>
        </a></li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap');

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

header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  transition: 0.5s ease all;
  background-color: #fff;
}

header.scrolled-nav {
  background-color: #000;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

header.scrolled-nav nav {
  padding: 8px 0;
}

header.scrolled-nav nav .branding,
header.scrolled-nav nav .navigation li a,
header.scrolled-nav nav .icon,
header.scrolled-nav nav .cartCount {
  color: #fff;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 0.5s ease all;
  /* margin: 0 auto; */
  padding: 15px;
  @media (min-width: 1740px) {
    max-width: 1740px;
  }
}

.branding {
  font-size: 30px;
  font-family: 'Oxygen', sans-serif;
  letter-spacing: 10px;
  color: #000;
}

.navigation {
  display: flex;
  align-items: center;
}

.navigation li {
  list-style: none;
  margin: 0 15px;
}

.navigation li a {
  text-decoration: none;
  color: #000;
  font-weight: 500;
  transition: 0.3s ease all;
}

.navigation li a:hover {
  color: #666;
}

.icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
}

.icon i {
  cursor: pointer;
  font-size: 24px;
  transition: 0.3s ease all;
}

/* Mobile Navigation */
.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: #fff;
  top: -16px;
  left: 0;
  padding: 20px;
}

.dropdown-nav li {
  margin: 15px 0;
  list-style: none;
}

.dropdown-nav li a {
  color: #000;
  text-decoration: none;
}

/* Navigation Transitions */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 0.3s ease all;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}
</style>
