<script setup lang="ts">
  defineProps<{
    text: string;
    customStyle: Record<string, string>
  }>()
</script>

<template>
  <button class="btn"
    :style="customStyle"
  >
    {{ text }}
  </button>
</template>

<style lang="css" scoped>
  .btn {
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
  width: 100%;
}
</style>