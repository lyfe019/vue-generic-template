<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Validation Message Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Variant 1: Basic Input with Error -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Username Input with Error</h3>
        <div>
          <label for="username-input" class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <input
            type="text"
            id="username-input"
            placeholder="Enter your username"
            class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring sm:text-sm"
            :class="{ 'border-error focus:ring-red-500 focus:border-red-500': usernameError }"
            aria-describedby="username-error-msg"
            v-model="username"
            @input="validateUsername"
          />
          <ValidationMessage
            v-if="usernameError"
            type="error"
            :message="usernameErrorMessage"
            id="username-error-msg"
          />
        </div>
      </section>

      <!-- Variant 2: Email Input with Success -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Email Input with Success/Error</h3>
        <div>
          <label for="email-input" class="block text-sm font-medium text-gray-700 mb-1"
            >Email Address</label
          >
          <input
            type="email"
            id="email-input"
            placeholder="user@example.com"
            class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring sm:text-sm"
            :class="{
              'border-success focus:ring-green-500 focus:border-green-500':
                emailValid && emailTouched,
              'border-error focus:ring-red-500 focus:border-red-500':
                !emailValid && emailTouched && email.length > 0,
              'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500':
                !emailTouched || email.length === 0,
            }"
            aria-describedby="email-validation-msg"
            v-model="email"
            @input="validateEmail"
            @blur="emailTouched = true"
          />
          <ValidationMessage
            v-if="!emailValid && emailTouched && email.length > 0"
            type="error"
            message="Please enter a valid email address."
            id="email-validation-msg"
          />
          <ValidationMessage
            v-else-if="emailValid && emailTouched"
            type="success"
            message="Looks good! Email is valid."
            id="email-validation-msg"
          />
          <ValidationMessage
            v-else
            type="hint"
            message="Enter a valid email address."
            id="email-validation-msg"
          />
        </div>
      </section>

      <!-- Variant 3: Password Input with Hint and Dynamic Validation -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Password Input with Dynamic Hint/Error
        </h3>
        <div>
          <label for="password-input" class="block text-sm font-medium text-gray-700 mb-1"
            >Password</label
          >
          <input
            type="password"
            id="password-input"
            v-model="password"
            placeholder="Enter your password"
            class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring sm:text-sm"
            :class="{
              'border-error focus:ring-red-500 focus:border-red-500': passwordError,
              'border-success focus:ring-green-500 focus:border-green-500':
                passwordTouched && !passwordError && password.length > 0,
              'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !passwordTouched,
            }"
            aria-describedby="password-validation-msg"
            @input="validatePassword"
            @blur="passwordTouched = true"
          />
          <ValidationMessage
            v-if="passwordHint && !passwordError"
            type="hint"
            :message="passwordHint"
            id="password-validation-msg"
          />
          <ValidationMessage
            v-else-if="passwordError"
            type="error"
            :message="passwordErrorMessage"
            id="password-validation-msg"
          />
          <ValidationMessage
            v-else-if="passwordTouched && !passwordError && password.length > 0"
            type="success"
            message="Password meets requirements!"
            id="password-validation-msg"
          />
        </div>
      </section>

      <!-- Variant 4: Textarea with Error and Help Text (Simulated) -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Description Field with Dynamic Feedback
        </h3>
        <div>
          <label for="description-textarea" class="block text-sm font-medium text-gray-700 mb-1"
            >Product Description</label
          >
          <textarea
            id="description-textarea"
            rows="4"
            v-model="description"
            class="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring sm:text-sm resize-y"
            :class="{
              'border-error focus:ring-red-500 focus:border-red-500': descriptionError,
              'border-success focus:ring-green-500 focus:border-green-500':
                descriptionValid && descriptionTouched,
              'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500': !descriptionTouched,
            }"
            aria-describedby="description-hint description-error-msg"
            @input="validateDescription"
            @blur="descriptionTouched = true"
          ></textarea>
          <ValidationMessage
            type="hint"
            :message="`Provide a brief description of the product. Characters: ${description.length}/${maxDescriptionLength}.`"
            id="description-hint"
          />
          <ValidationMessage
            v-if="descriptionError"
            type="error"
            :message="descriptionErrorMessage"
            id="description-error-msg"
          />
          <ValidationMessage
            v-else-if="descriptionValid && descriptionTouched"
            type="success"
            message="Description looks great!"
            id="description-error-msg"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ValidationMessage } from '@/components/feedback' // Import the new component
import { Icon } from '@/components/common' // Ensure Icon is imported if needed for info messages

// Username Validation
const username = ref('')
const usernameError = ref(false)
const usernameErrorMessage = ref('')

const validateUsername = () => {
  if (username.value.length < 3 && username.value.length > 0) {
    usernameError.value = true
    usernameErrorMessage.value = 'Username must be at least 3 characters.'
  } else if (username.value.length === 0) {
    usernameError.value = true
    usernameErrorMessage.value = 'Username is required.'
  } else {
    usernameError.value = false
    usernameErrorMessage.value = ''
  }
}

// Email Validation
const email = ref('')
const emailValid = ref(false)
const emailTouched = ref(false)

const validateEmail = () => {
  // Basic email regex for demonstration
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  emailValid.value = emailRegex.test(email.value)
}

// Password Validation
const password = ref('')
const passwordError = ref(false)
const passwordErrorMessage = ref('')
const passwordTouched = ref(false)

const passwordHint = computed(() => {
  if (password.value.length === 0 && !passwordTouched.value) {
    return 'Your password must be at least 8 characters long and include a number.'
  }
  return ''
})

const validatePassword = () => {
  passwordError.value = false
  passwordErrorMessage.value = ''

  if (password.value.length > 0 && password.value.length < 8) {
    passwordError.value = true
    passwordErrorMessage.value = 'Password must be at least 8 characters long.'
  } else if (!/\d/.test(password.value) && password.value.length > 0) {
    passwordError.value = true
    passwordErrorMessage.value = 'Password must include at least one number.'
  }
}

// Description Validation
const description = ref('This is a short description.') // Initial content
const maxDescriptionLength = 200
const descriptionError = ref(false)
const descriptionErrorMessage = ref('')
const descriptionValid = ref(true) // Initially valid as it has content
const descriptionTouched = ref(false)

const validateDescription = () => {
  if (description.value.length > maxDescriptionLength) {
    descriptionError.value = true
    descriptionErrorMessage.value = `Description exceeds maximum allowed characters (${description.value.length}/${maxDescriptionLength}).`
    descriptionValid.value = false
  } else if (description.value.length === 0) {
    descriptionError.value = true
    descriptionErrorMessage.value = 'Description cannot be empty.'
    descriptionValid.value = false
  } else {
    descriptionError.value = false
    descriptionErrorMessage.value = ''
    descriptionValid.value = true
  }
}

// Initial validation on mount
import { onMounted } from 'vue'
onMounted(() => {
  validateUsername()
  validateEmail()
  validatePassword()
  validateDescription()
})
</script>

<style scoped>
/* These styles are imported from the original HTML and apply to inputs
   and are generally useful for all forms. They are here for demonstration
   but in a larger app might be global or in a dedicated form CSS. */
.border-error {
  border-color: #ef4444;
} /* red-500 */
.border-success {
  border-color: #10b981;
} /* green-500 */
</style>
