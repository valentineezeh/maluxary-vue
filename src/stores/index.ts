import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { data } from '../utils'
import type { ProductTypes, Store } from '@/types'

export const useStore = defineStore('store', () => {
  const state = reactive<Store>({
    products: data,
    cart: [],
  })

  const showSidePanel = ref(false)
  const searchValue = ref('')

  const addToCart = (product: ProductTypes) => {
    const existingItem = state.cart.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += 1
      existingItem.price = existingItem.unitPrice * existingItem.quantity
    } else {
      state.cart.push({ ...product, quantity: 1, unitPrice: product.price })
    }
    updateCartTotal()
  }

  const updateCartTotal = () => {
    state.cart.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    )
  }

  const cartSubtotal = computed(() => {
    return state.cart.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0,
    )
  })

  const cartItemCount = computed(() => {
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  })

  const removeFromCart = (product: ProductTypes) => {
    const index = state.cart.findIndex(item => item.id === product.id)
    if (index !== -1) {
      state.cart.splice(index, 1)
      updateCartTotal()
    }
  }

  const decrementFromCart = (product: ProductTypes) => {
    state.cart.map(item => {
      if (item.id === product.id) {
        item.quantity -= 1
        item.price = item.unitPrice * item.quantity
      }
      return item
    })
    updateCartTotal()
  }

  const setSidePanel = (value: boolean) => {
    showSidePanel.value = value
  }

  const setSearchQuery = (value: string) => {
    searchValue.value = value
  }

  const searchResults = computed(() => {
    if (searchValue.value.trim().length === 0) {
      return state.products
    }
    const normalizedSearchTerm = searchValue.value.toLocaleLowerCase().trim()
    return state.products.filter(product =>
      product.title.toLowerCase().includes(normalizedSearchTerm),
    )
  })

  return {
    ...state,
    addToCart,
    cartItemCount,
    setSidePanel,
    showSidePanel,
    removeFromCart,
    cartSubtotal,
    decrementFromCart,
    searchResults,
    searchValue,
    setSearchQuery,
  }
})
