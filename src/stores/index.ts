import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ProductTypes, Store } from '@/types'
import { indexedDBService } from '@/service'

const baseUrl = 'https://pangaea-interviews.now.sh'

export const useStore = defineStore('store', () => {
  const state = reactive<Store>({
    products: [],
    cart: [],
  })

  const showSidePanel = ref(false)
  const searchValue = ref('')
  const isLoading = ref(false)
  const error = ref('')
  const currentCurrency = ref('USD')

  const initializeStore = async() => {
    try {
      // open the index DB
      await indexedDBService.openDB();
      await fetchProducts()

      await indexedDBService.saveProducts(state.products)
    } catch(err){
      console.error('Failed to initialize store ', err)
      error.value = 'Failed to initialize store'
    }
  }

  const getProductsFromCache = async () => {
    try {
      const products = await indexedDBService.getProducts()
      return state.products = products
    } catch(err){
      console.error('Failed to get products ', err)
      error.value = 'Failed to get products'
    }
  }

  const getCartFromCache = async () => {
    try {
      const cart = await indexedDBService.getCartProducts()
      state.cart = [...cart]
    } catch(err){
      console.error('Failed to get cart ', err)
      error.value = 'Failed to get cart'
    }
  }

  const fetchProductsFromApi = async() => {
    try {
      const res = await axios({
        url: `${baseUrl}/api/graphql`,
        method: "post",
        data: {
          query: `
        query {
          products {
            id
            title
            image_url
            price(currency: ${currentCurrency.value})
          }
        }
        `,
        },
      });
      return res.data
    } catch(error){
      return error
    }
  }

  const fetchProducts = async() => {
    isLoading.value = true;
    try {
      const products = await fetchProductsFromApi();
      state.products = products.data.products
    } catch(err) {
      error.value = 'Failed to fetch products';
      console.error(err)
    } finally {
      isLoading.value = false;
    }
  }

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

  const updateCartTotal = async () => {
    try {
      // open the index DB
      await indexedDBService.openDB();
      state.cart.reduce(
        (total, item) => total + item.unitPrice * item.quantity,
        0,
      )
      await indexedDBService.saveCartProducts(state.cart)
    } catch(error) {
      console.error('something went wrong', error)
    }
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

  const removeFromCart = async (product: ProductTypes) => {
    const index = state.cart.findIndex(item => item.id === product.id)
    if (index !== -1) {
      await indexedDBService.deleteItemFromCart(product.id)
      state.cart.splice(index, 1)
      updateCartTotal()
    }
  }

  const decrementFromCart = async (product: ProductTypes) => {
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

  const getCart = computed(() => {
    return state.cart
  })

  const changeCurrency = async(newCurrency: string) => {
    if(newCurrency === currentCurrency.value) return
    currentCurrency.value = newCurrency
    await updatePrices(newCurrency)
  }

  const updatePrices = async(newCurrency: string) => {
    isLoading.value = true;

    try {
      const res = await axios({
        url: `${baseUrl}/api/graphql`,
        method: 'post',
        data: {
          query: `
            query {
              products {
                id
                price(currency: ${newCurrency})
              }
            }
          `,
        }
      });

      // update prices in the product array
      const newPrices = res.data.data.products;
      state.products = state.products.map(prod => {
        const newPrice = newPrices.find((p: ProductTypes) => p.id === prod.id);
        return { ...prod, price: newPrice.price };
      })

      // update prices in the cart items
      state.cart = state.cart.map(item => {
        const newPrice = newPrices.find((p: ProductTypes) => p.id === item.id)
        if(newPrice) {
          return {...item, price: newPrice.price * item.quantity, unitPrice: newPrice.price}
        }
        return item
      })
    } catch(err) {
      error.value = 'Failed to update prices';
      console.error('Failed to update prices:', err);
    } finally {
      isLoading.value = false
  }
}

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
    initializeStore,
    getProductsFromCache,
    getCartFromCache,
    getCart,
    changeCurrency,
    currentCurrency
  }
})
