<script setup lang="ts">

  type InputProps = {
    input: object
    placeholder: string
    name: string
    value: string
    label?: string
    required?: boolean
    disabled?: boolean
    class?: string
    textError: boolean
    textErrorMessage: string
  }

  const props = defineProps<InputProps>()

  const emit = defineEmits<{
  'update:value': [value: string]
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:value', target.value)
}

  console.log('props >>>> ', props.value)

</script>

<template>
  <input
    v-bind="props.input"
    :placeholder="props.placeholder"
    :value="props.value"
    @input="handleInput"
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
}
</style>