// useInputField.ts
import { ref, reactive, computed, type UnwrapRef } from 'vue'

interface InputFieldState<Value = string> {
  autoFilled: boolean
  checked?: boolean
  isDirty: boolean
  isBlurred: boolean
  isFocused: boolean
  isValid: boolean
  value: Value | null,
  errorMessage: string
}

interface InputFieldOptions<Value = string> {
  type?: string
  defaultValue?: Value
  defaultChecked?: boolean
  placeholder?: string
  validate?: (value: Value) => boolean
  onChange?: (event: Event, value: Value, isValid: boolean) => void
  onBlur?: (event: FocusEvent) => void
  onFocus?: (event: FocusEvent) => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  required?: boolean
}

export function useInputField<Value = string>(name = '', options: InputFieldOptions<Value> = {}) {
  const inputRef = ref<HTMLInputElement | null>(null)

  const inputOptions = {
    type: name.toLowerCase().includes('password') ? 'password' : options.type,
    id: name,
    name,
    defaultChecked: false,
    placeholder: '',
    validate: (value: Value) => validateField(value as string),
    ...options,
  }

  const {
    onChange,
    onBlur,
    onFocus,
    defaultChecked,
    defaultValue,
    validate,
    placeholder,
    required,
    ...otherOptions
  } = inputOptions


  const isRadioOrCheckbox = ['radio', 'checkbox'].includes(inputOptions.type)

  const state = reactive<InputFieldState<Value>>({
    autoFilled: false,
    checked: isRadioOrCheckbox ? defaultChecked : undefined,
    isDirty: false,
    isBlurred: false,
    isFocused: false,
    isValid: true,
    value: defaultValue,
    errorMessage: ''
  })

  const validateField = (fieldValue: string) => {

    // Check for empty field first
    if(required) {
      if (fieldValue === null || fieldValue === undefined || (typeof fieldValue === 'string' && fieldValue.trim() === '')) {
      state.isValid = false
      state.isDirty = true
      state.errorMessage = `${options.name} is required`;
      return false;
    }
    }

    // Then check format validation
    if (options.type === 'email') {
      const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)
      if(!validateEmail){
        state.isValid = false
        state.isDirty = true
        state.errorMessage = `Please enter a valid ${options.name.toLowerCase()}`;
        return false;
      }
    }

    // Clear error if validation passes
    state.isValid = true
    state.isDirty = false
    state.errorMessage = '';
    return true;
  };

  const onAnimationStart = (event: AnimationEvent) => {
    if (event.animationName === 'onAutoFillStart') {
      state.autoFilled = true
    }
  }

  const reset = (newValue: Value | boolean) => {
    if (typeof newValue === 'boolean' && isRadioOrCheckbox) {
      state.checked = Boolean(newValue) || defaultChecked
    } else if (typeof newValue !== 'boolean') {
      state.value = newValue as UnwrapRef<Value>
    }
    state.isDirty = false
    state.isBlurred = false
    state.isFocused = false
  }

  const setValue = (value: Value) => {
    state.value = value as UnwrapRef<Value>
    state.isDirty = true
    state.isValid = validate(value)
    validateField(value as string)
  }

  const setIsValid = (valid: boolean) => {
    state.isValid = valid
  }

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newValue = target.value as unknown as Value
    const checked = target.checked

    const isInputValid = isRadioOrCheckbox ? !!checked : !!newValue

    state.value = newValue as UnwrapRef<Value>
    state.checked = checked
    state.isDirty = true
    state.isValid = validate(newValue) //isInputValid

    onChange?.(event, newValue, isInputValid)
  }

  const handleBlur = (event: FocusEvent) => {
    state.isBlurred = true
    state.isFocused = false

    if (state.value !== null) {
      validateField(state.value as string)
    }

    onBlur?.(event)
  }

  const handleFocus = (event: FocusEvent) => {
    state.isFocused = true
    onFocus?.(event)
  }

  const inputProps = {
    ...otherOptions,
    ref: inputRef,
    value: state.value,
    checked: state.checked,
    onAnimationstart: onAnimationStart,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus
  }

  return {
    // State
    value: computed(() => state.value),
    isDirty: computed(() => state.isDirty),
    isValid: computed(() => state.isValid),
    isBlurred: computed(() => state.isBlurred),
    isFocused: computed(() => state.isFocused),
    errorMessage: computed(() => state.errorMessage),
    checked: computed(() => state.checked),
    autoFilled: computed(() => state.autoFilled),
    placeholder,
    validateField,
    required,

    // Methods
    set: setValue,
    setIsValid,
    reset,
    // Input props
    input: inputProps
  }
}

export type InputProps = {
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  checked?: boolean;
  onAnimationstart?: () => void;
  onChange?: (event: Event) => void;
  onBlur?: (event: FocusEvent) => void;
  onFocus?: (event: FocusEvent) => void;
}