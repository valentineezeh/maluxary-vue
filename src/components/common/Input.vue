<script setup lang="ts">

import { InputProps } from '../../hooks/useInputField'

export type InputPropsType = {
    input: InputProps
    placeholder: string
    name?: string
    value: string
    required?: boolean
    disabled?: boolean
    class?: string
    textError: boolean
    textErrorMessage: string
  }

  const props = defineProps<InputPropsType>()

</script>

<template>
  <input
    v-bind="props.input"
    :placeholder="props.placeholder"
    :value="props.value"
    />
    <span v-if="props.textError" class="text-error">
      {{ props.textErrorMessage }}
    </span>
</template>

<style scoped>
 input {
  padding: 19px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
}

.text-error {
    color: red;
  }
</style>