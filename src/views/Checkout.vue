<script setup lang="ts">

import { useInputField } from '@/hooks/useInputField'

const {
  input: emailInput,
  value: emailValue,
  isError: emailError,
  placeholder: emailPlaceholder,
} = useInputField('email', {
  type: 'email',
  placeholder: 'Enter your email',
  name: 'Email',
  validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
})

const {
  input: firstNameInput,
  value: firstNameValue,
  isError: firstNameError,
  placeholder: firstNamePlaceholder,
} = useInputField('firstname', {
  type: 'text',
  placeholder: 'First name',
  name: 'First name',
  validate: (value) => value.trim().length !== 0,
})

const {
  input: lastNameInput,
  value: lastNameValue,
  isError: lastNameError,
  placeholder: lastNamePlaceholder,
} = useInputField('lastname', {
  type: 'text',
  placeholder: 'Last name',
  name: 'Last name',
  validate: (value) => value.trim().length !== 0,
})

const {
  input: addressInput,
  value: addressValue,
  isError: addressError,
  placeholder: addressPlaceholder,
} = useInputField('address', {
  type: 'text',
  placeholder: 'Street address',
  name: 'Street address',
  validate: (value) => value.trim().length !== 0,
})

// watchEffect(() => {
//   console.log('Value changed:', value.value, 'Valid:', isValid.value)
// })

const handleInputUpdate = (fieldName: string, value: string) => {
  
}
</script>

<template>
  <div class="container">
    <div class="form">
      <form>
        <h3>Shipping Address</h3>
        <Input
          :input="emailInput"
          :placeholder="emailPlaceholder"
          :value="emailValue"
          :textError="emailError"
          :textErrorMessage="'Please enter a valid email'"
        />
        <!-- <span v-if="emailError" class="text-error">Please enter a valid email</span> -->
        <div class="form-group">
          <div class="form-input">
            <input
            v-bind="firstNameInput"
            :placeholder="firstNamePlaceholder"
            :value="firstNameValue"
          />
          <span v-if="firstNameError" class="text-error">
            This field is required
          </span>
          </div>
          <div class="form-input">
            <input
            v-bind="lastNameInput"
            :placeholder="lastNamePlaceholder"
            :value="lastNameValue"
          />
          <span v-if="lastNameError" class="text-error">
            This field is required
          </span>
          </div>
        </div>
          <input
              v-bind="addressInput"
              :placeholder="addressPlaceholder"
              :value="addressValue"
            />
        <input type="text" placeholder="Apartment, suite" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Post code" />
        <input type="text" placeholder="Country" />
      </form>

    </div>
  </div>
</template>

<style lang="css" scoped>
  h1 {
    text-align: center;
  }
  .form-input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    margin: 5rem;;
    width: 50%;
  }

  .form-group {
    display: flex;
    gap: 20px;
  }

  input {
  padding: 19px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  width: 100%;
  }

  .text-error {
    color: red;
  }
</style>