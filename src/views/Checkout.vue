<script setup lang="ts">
import Input from '@/components/common/Input.vue'
import { useInputField } from '@/hooks/useInputField'
import OrderLists from '@/components/OrderLists.vue';
import Button from '@/components/common/Button.vue';


const {
  input: emailInput,
  value: emailValue,
  isError: emailError,
  placeholder: emailPlaceholder,
} = useInputField('email', {
  type: 'email',
  placeholder: 'Enter your email',
  name: 'Email',
  validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
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
  validate: (value: string) => value.trim().length !== 0,
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
  validate: (value: string) => value.trim().length !== 0,
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
  validate: (value: string) => value.trim().length !== 0,
})

const {
  input: cityInput,
  value: cityValue,
  isError: cityError,
  placeholder: cityPlaceholder,
} = useInputField('city', {
  type: 'text',
  placeholder: 'City',
  name: 'City',
  validate: (value: string) => value.trim().length !== 0,
})

const {
  input: apartmentInput,
  value: apartmentValue,
  isError: apartmentError,
  placeholder: apartmentPlaceholder,
} = useInputField('apartment', {
  type: 'text',
  placeholder: 'Apartment, Suite, etc',
  name: 'apartment',
})

const {
  input: countryInput,
  value: countryValue,
  isError: countryError,
  placeholder: countryPlaceholder,
} = useInputField('country', {
  type: 'text',
  placeholder: 'Country',
  name: 'country',
  validate: (value: string) => value.trim().length !== 0,
})

const {
  input: postcodeInput,
  value: postcodeValue,
  isError: postcodeError,
  placeholder: postcodePlaceholder,
} = useInputField('postcode', {
  type: 'text',
  placeholder: 'Postcode',
  name: 'postcode',
  validate: (value: string) => value.trim().length !== 0,
})

// watchEffect(() => {
//   console.log('Value changed:', value.value, 'Valid:', isValid.value)
// })

// const handleInputUpdate = (fieldName: string, value: string) => {

// }
</script>

<template>
  <div class="container">
    <div class="form">
      <form @submit.prevent>
        <h3>Shipping Address</h3>
        <Input
          :input="emailInput"
          :placeholder="emailPlaceholder"
          :value="emailValue ?? ''"
          :textError="emailError"
          :textErrorMessage="'Please enter a valid email'"
        />
        <div class="form-group">
          <div class="form-input">
            <Input
            :input="firstNameInput"
            :placeholder="firstNamePlaceholder"
            :value="firstNameValue ?? ''"
            :textError="firstNameError"
            :textErrorMessage="'This field is required'"
          />
          </div>
          <div class="form-input">
            <Input
              :input="lastNameInput"
              :placeholder="lastNamePlaceholder"
              :value="lastNameValue ?? ''"
              :textError="lastNameError"
              :textErrorMessage="'This field is required'"
            />
          </div>
        </div>
          <Input
            :input="addressInput"
            :placeholder="addressPlaceholder"
            :value="addressValue ?? ''"
            :textError="addressError"
            :textErrorMessage="'This field is required'"
            />
          <Input
            :input="apartmentInput"
            :placeholder="apartmentPlaceholder"
            :value="apartmentValue ?? ''"
            :textError="apartmentError"
            :textErrorMessage="'This field is required'"
            />
          <Input
            :input="cityInput"
            :placeholder="cityPlaceholder"
            :value="cityValue ?? ''"
            :textError="cityError"
            :textErrorMessage="'This field is required'"
            />
          <Input
            :input="postcodeInput"
            :placeholder="postcodePlaceholder"
            :value="postcodeValue ?? ''"
            :textError="postcodeError"
            :textErrorMessage="'This field is required'"
            />
          <Input
            :input="countryInput"
            :placeholder="countryPlaceholder"
            :value="countryValue ?? ''"
            :textError="countryError"
            :textErrorMessage="'This field is required'"
            />

            <div class="policy">
              <input class="form-check-input" type="checkbox"/>
              I agree to receive marketing emails about new products and promotions. View our privacy policy $ terms of service.
            </div>
            <Button
              :text="'Confirm shipping information'"
              :customStyle="{
                color: 'white',
                backgroundColor: '#525850',
                marginTop: '20px',
              }"
              />
      </form>
    </div>
      <OrderLists  />
  </div>
</template>

<style lang="css" scoped>
.policy {
  display: grid;
  grid-template-columns: 1fr 10fr;
}

.form-check-input{
  height: 20px;
}

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
    justify-content: space-evenly;
    gap: 50px;
    margin: 3rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 40%;
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