<script setup lang="ts">

import { InputProps } from '../../hooks/useInputField'

export type InputPropsType = {
    input?: InputProps
    placeholder?: string
    name?: string
    value?: string | boolean | number
    required?: boolean
    disabled?: boolean
    class?: string
    textError?: boolean
    textErrorMessage?: string
    type?: string;
    customStyle?: {
      [key: string]: string | undefined;
    }
    label?: string
    checked?: boolean
  }

  const props = defineProps<InputPropsType>()
  console.log('props.required inside input >?>>>> ', props)

</script>

<template>
  <div class="label" v-if="props.type !== 'checkbox' && props.type !== 'radio'">
    {{ label }}
    <span class="required" v-if="props.required">*</span>
  </div>
  <input
    v-bind="props.input"
    :placeholder="props.placeholder"
    :value="props.value"
    :style="props.customStyle"
    :class="{'error-border': textError}"
    :checked="props.checked"
    @change="props.input?.onChange"
    />
    <span v-if="props.textError" class="text-error">
      {{ props.textErrorMessage }}
    </span>
</template>

<style scoped>
.required {
  color: red;
}
.label {
  display: flex;
  gap: 20px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 5px;
}
 input {
  padding: 19px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
}

.error-border {
  border: 1px solid red !important;
}

.text-error {
    color: red;
  }
</style>