<script lang="ts" setup>
import Search from './Search.vue'
import ProductList from './ProductList.vue'
import { useStore } from '@/stores'

const store = useStore()
</script>

<template>
  <Search v-model="store.searchValue" />
  <ProductList />
</template>
