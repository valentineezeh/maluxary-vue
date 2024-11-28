<script setup lang="ts">
import Input from '@/components/common/Input.vue'
import { useInputField } from '@/hooks/useInputField'
import OrderLists from '@/components/OrderLists.vue';
import Button from '@/components/common/Button.vue';


const {
  input: emailInput,
  value: emailValue,
  placeholder: emailPlaceholder,
  required: emailRequired,
  validateField: emailValidate,
  errorMessage: emailErrorMessage,
  isDirty: emailIsDirty,
  isValid: emailIsValid
} = useInputField('email', {
  type: 'email',
  placeholder: 'Enter your email',
  name: 'Email',
  required: true,
})

const {
  input: firstNameInput,
  value: firstNameValue,
  placeholder: firstNamePlaceholder,
  required: firstNameRequired,
  validateField: firstNameValidate,
  errorMessage: firstNameErrorMessage,
  isDirty: firstNameIsDirty,
  isValid: firstNameIsValid
} = useInputField('firstname', {
  type: 'text',
  placeholder: 'First name',
  name: 'First name',
  required: true,
})

const {
  input: lastNameInput,
  value: lastNameValue,
  placeholder: lastNamePlaceholder,
  required: lastNameRequired,
  validateField: lastNameValidate,
  errorMessage: lastNameErrorMessage,
  isDirty: lastNameIsDirty,
  isValid: lastNameIsValid
} = useInputField('lastname', {
  type: 'text',
  placeholder: 'Last name',
  name: 'Last name',
  required: true
})

const {
  input: addressInput,
  value: addressValue,
  placeholder: addressPlaceholder,
  required: addressRequired,
  validateField: addressValidate,
  errorMessage: addressErrorMessage,
  isDirty: addressIsDirty,
  isValid: addressIsValid
} = useInputField('address', {
  type: 'text',
  placeholder: 'Street address',
  name: 'Street address',
  required: true,
})

const {
  input: cityInput,
  value: cityValue,
  placeholder: cityPlaceholder,
  required: cityRequired,
  validateField: cityValidate,
  errorMessage: cityErrorMessage,
  isDirty: cityIsDirty,
  isValid: cityIsValid
} = useInputField('city', {
  type: 'text',
  placeholder: 'City',
  name: 'City',
  required: true,
})

const {
  input: apartmentInput,
  value: apartmentValue,
  placeholder: apartmentPlaceholder,
} = useInputField('apartment', {
  type: 'text',
  placeholder: 'Apartment, Suite, etc',
  name: 'Apartment',
  required: false
})

const {
  input: countryInput,
  value: countryValue,
  placeholder: countryPlaceholder,
  required: countryRequired,
  validateField: countryValidate,
  errorMessage: countryErrorMessage,
  isDirty: countryIsDirty,
  isValid: countryIsValid
} = useInputField('country', {
  type: 'text',
  placeholder: 'Country',
  name: 'country',
  required: true,
})

const {
  input: postcodeInput,
  value: postcodeValue,
  placeholder: postcodePlaceholder,
  required: postcodeRequired,
  validateField: postcodeValidate,
  errorMessage: postcodeErrorMessage,
  isDirty: postcodeIsDirty,
  isValid: postcodeIsValid
} = useInputField('postcode', {
  type: 'text',
  placeholder: 'Postcode',
  name: 'postcode',
  required: true,
})

const {
  input: policyInput,
  value: policyValue,
  errorMessage: policyErrorMessage,
  isDirty: policyIsDirty,
  isValid: policyIsValid,
  checked: termsChecked,
} = useInputField('policy', {
  type: 'checkbox',
  name: 'policy',
  required: true,
  onChange: (e: Event) => {
    policyValue.value = (e.target as HTMLInputElement).checked

    console.log('policyValue.value >>>> ', policyValue.value)
  }
})

const onSubmit = () => {
  const validations = {
    email: emailValidate(emailValue.value),
    firstName: firstNameValidate(firstNameValue.value),
    lastName: lastNameValidate(lastNameValue.value),
    address: addressValidate(addressValue.value),
    city: cityValidate(cityValue.value),
    country: countryValidate(countryValue.value),
    postcode: postcodeValidate(postcodeValue.value),
  }

  const isFormValid = Object.values(validations).every((isValid) => isValid)

  if(isFormValid){
    console.log('>>>>> on Submit <<<<< ')
  }
}
</script>

<template>
  <div class="container">
    <div class="form">
      <form @submit.prevent="onSubmit">
        <h3>Shipping Address</h3>
        <Input
          :input="emailInput"
          :placeholder="emailPlaceholder"
          :value="emailValue ?? ''"
          :label="'Email'"
          :required="emailRequired"
          :textError="emailIsDirty && !emailIsValid"
          :textErrorMessage="emailErrorMessage"
        />
        <div class="form-group">
          <div class="form-input">
            <Input
            :input="firstNameInput"
            :placeholder="firstNamePlaceholder"
            :value="firstNameValue ?? ''"
            :textError="firstNameIsDirty && !firstNameIsValid"
            :textErrorMessage="firstNameErrorMessage"
            :label="'First name'"
            :required="firstNameRequired"
          />
          </div>
          <div class="form-input">
            <Input
              :input="lastNameInput"
              :placeholder="lastNamePlaceholder"
              :value="lastNameValue ?? ''"
              :textError="lastNameIsDirty && !lastNameIsValid"
              :textErrorMessage="lastNameErrorMessage"
              :label="'Last name'"
              :required="lastNameRequired"
            />
          </div>
        </div>
          <Input
            :input="addressInput"
            :placeholder="addressPlaceholder"
            :value="addressValue ?? ''"
            :textError="addressIsDirty && !addressIsValid"
            :textErrorMessage="addressErrorMessage"
            :label="'Address'"
            :required="addressRequired"
            />
          <Input
            :input="cityInput"
            :placeholder="cityPlaceholder"
            :value="cityValue ?? ''"
            :textError="cityIsDirty && !cityIsValid"
            :textErrorMessage="cityErrorMessage"
            :label="'City'"
            :required="cityRequired"
            />
          <Input
            :input="apartmentInput"
            :placeholder="apartmentPlaceholder"
            :value="apartmentValue ?? ''"
            :label="'Apartment'"
            />
          <Input
            :input="postcodeInput"
            :placeholder="postcodePlaceholder"
            :value="postcodeValue ?? ''"
            :textError="postcodeIsDirty && !postcodeIsValid"
            :textErrorMessage="postcodeErrorMessage"
            :label="'Postcode'"
            :required="postcodeRequired"
            />
          <Input
            :input="countryInput"
            :placeholder="countryPlaceholder"
            :value="countryValue ?? ''"
            :textError="countryIsDirty && !countryIsValid"
            :textErrorMessage="countryErrorMessage"
            :label="'Country'"
            :required="countryRequired"
            />

            <div class="policy">
              <Input
                :input="policyInput"
                :value="policyValue"
                :textError="policyIsDirty && !policyIsValid"
                :textErrorMessage="policyErrorMessage"
                :customStyle="{
                  height: '15px',
                  width: '15px',
                }"
                />
              <p>
                I agree to receive marketing emails about new products and promotions. View our privacy policy and terms of service.
              </p>
            </div>
            <Button
              :text="'Confirm shipping information'"
              :customStyle="{
                color: 'black',
                backgroundColor: '#fff',
                marginTop: '20px',
              }"
              />
      </form>
    </div>
      <OrderLists  />
  </div>
</template>

<style lang="css" scoped>
/* .policy {
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr minmax(100px, 1fr);
  grid-gap: 10px;
} */

.policy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
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
    margin-bottom: 50px;
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
  @media (max-width: 768px) {
    .container {
      margin: 0;
      padding: 20px 20px;
      flex-wrap:wrap-reverse;
    }
    .form {
      width: 100%;
    }
  }
</style>