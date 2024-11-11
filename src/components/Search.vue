<script setup lang="ts">
import { useStore } from '@/stores'

defineProps<{
  modelValue: string
}>()

const store = useStore()

const handleSearch = (value: string) => {
  store.setSearchQuery(value)
}
</script>

<template>
  <section>
    <div class="search-container">
      <div class="search-text">
        <h1>All Products</h1>
        <p>A 360 look at our platform</p>
      </div>
      <div class="search-input">
        <input
          type="text"
          placeholder="Search"
          name="search"
          :value="modelValue"
          @input="handleSearch($event?.target?.value ?? '')"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 50%;
  width: 100%;
  background: #f5f5f3;
  justify-content: space-between;
}
.search-container h1 {
  font-family: 'Oxygen';
  letter-spacing: 5px;
  font-size: 35px;
}

.search-input {
  align-content: center;
  margin-right: 2rem;
  width: 20rem;
}

input[type='text'] {
  padding: 19px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 100%;
}

.search-text {
  margin: 70px;
}

@media screen and (max-width: 480px) {
  .search-input {
    position: relative;
    left: 12%;
  }
}
</style>
