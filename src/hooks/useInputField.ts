// useInputField.ts
import { ref, reactive, computed, type UnwrapRef } from 'vue'

interface InputFieldState<Value = string> {
  autoFilled: boolean
  checked?: boolean
  isDirty: boolean
  isBlurred: boolean
  isFocused: boolean
  isValid: boolean
  value: Value | null
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
}

export function useInputField<Value = string>(name = '', options: InputFieldOptions<Value> = {}) {
  const inputRef = ref<HTMLInputElement | null>(null)

  const inputOptions = {
    type: name.toLowerCase().includes('password') ? 'password' : 'text',
    id: name,
    name,
    defaultChecked: false,
    placeholder: '',
    validate: (value: Value) => !!value,
    ...options
  }

  const {
    onChange,
    onBlur,
    onFocus,
    defaultChecked,
    defaultValue,
    validate,
    placeholder,
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
    value: defaultValue || null
  })

  const isError = computed(() => !state.isValid && state.isDirty)

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
    isError,
    checked: computed(() => state.checked),
    autoFilled: computed(() => state.autoFilled),
    placeholder,

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