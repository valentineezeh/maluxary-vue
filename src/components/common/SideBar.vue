<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import CartCard from '../CartCard.vue'
import { useStore } from '@/stores'

// const props = defineProps<{
//   showSidePanel: boolean
//   onShowSidePanel: (value: boolean) => void
// }>()

const sidePanelRef = ref<HTMLElement | null>(null)

const store = useStore()
const { setSidePanel } = store
const { showSidePanel, currentCurrency } = storeToRefs(store)

const handleClickOutside = (event: MouseEvent) => {
  if (
    sidePanelRef.value &&
    !sidePanelRef.value?.contains(event.target as Node)
  ) {
    setSidePanel(false)
  }
}

const toggleBodyScroll = (disable: boolean) => {
  if (disable) {
    document.body.classList.add('panel-open')
  } else {
    document.body.classList.remove('panel-open')
  }
}

watch(showSidePanel, newValue => {
  toggleBodyScroll(newValue)
})

// watch(cart, newValue => {
//   console.log('cart >>> ', newValue)
// })

const handleCurrencyChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  store.changeCurrency(select.value)
}

onMounted(async () => {
  await store.getCartFromCache()
  document.addEventListener('mousedown', handleClickOutside)
  toggleBodyScroll(showSidePanel.value)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  toggleBodyScroll(showSidePanel.value)
})
</script>

<template>
  <div class="drawer" v-if="showSidePanel">
    <div class="drawer2">
      <div class="sidepanel" ref="sidePanelRef">
        <a href="#" class="closebtn" @click.stop="setSidePanel(false)">×</a>
        <div class="cart-header">
          <h4>YOUR CART</h4>
        </div>
        <div class="currency-selector-container">
          <select :value="currentCurrency" @change="handleCurrencyChange" :disabled="store.isLoading"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
            <option value="NGN">NGN</option>
          </select>
        </div>
        <div class="cart-product" v-for="item in store.getCart" :key="item.id">
          <CartCard :product="item" />
        </div>
        <div class="cart-footer">
          <div>
            <hr />
          </div>
          <div class="subtotal">
            <p>Subtotal</p>
            <p>{{ store.cartSubtotal }}</p>
          </div>
          <div class="cart-btn">
            <button class="sub-btn">MAKE THIS A SUBSCRIPTION (SAVE 20%)</button>
            <button class="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtotal {
  display: flex;
  justify-content: space-between;
  margin-left: 25px;
  margin-right: 30px;
}
.checkout-btn {
  background-color: #525850;
  border: 1px solid #ccc;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: roboto;
  cursor: pointer;
  width: 90%;
  margin-top: 10px;
  font-weight: 500;
}
.sub-btn {
  font-weight: 500;
  background-color: white;
  border: 1px solid #ccc;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  font-family: roboto;
  cursor: pointer;
  width: 90%;
}
.cart-footer {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.cart-product {
  display: flex;
  flex-direction: column;
  margin: 20px;
}
.currency-selector-container {
  position: relative;
  margin: 20px;
  width: 100px;
}
.currency-selector-container select {
  width: 100%;
  padding: 12px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  font-size: 16px;
  color: #333;
  appearance: none; /* Removes default styling in some browsers */
  -webkit-appearance: none; /* For older versions of Safari */
  -moz-appearance: none; /* For Firefox */
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
}

.currency-selector-container select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.drawer {
  position: fixed;
  z-index: 1300;
  opacity: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px; /* adjust as needed */
  overflow-y: auto;
}
.drawer2 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: -1;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
}
.sidepanel {
  position: fixed;
  z-index: 1;
  height: 250px;
  top: 0;
  right: 0;
  background-color: #f2f2f0;
  overflow-y: auto;
  transition: 0.5s;
  height: 100%;
}

.sidepanel a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidepanel a:hover {
  color: black;
}

.sidepanel .closebtn {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 36px;
}
.cart-header {
  text-align: center;
  color: #727467;
  letter-spacing: 3px;
}
</style>
