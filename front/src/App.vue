<script lang="ts" setup>
import { ref, computed } from "vue";
import { z } from "zod";

const emailSchema = z.string().min(5, {
  message: "5 characters minimum"
}).max(30, {
  message: "30 characters maximum"
}).email({
  message: "Invalid email"
});

const passwordSchema = z.string().regex(/[a-z]/, {
  message: "Lowercase letter missing"
}).regex(/[A-Z]/, {
  message: "Uppercase letter missing"
}).regex(/\d/, {
  message: "Number missing"
}).regex(/[^a-zA-Z0-9]/, {
  message: "Symbol missing"
}).min(8, {
  message: "8 characters minimum"
});

const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");

const emailError = computed(() => {
  const parsedEmail = emailSchema.safeParse(email.value);

  if (parsedEmail.success) {
    return "";
  }

  return parsedEmail.error.issues[0].message;
});

const passwordError = computed(() => {
  const parsedPassword = passwordSchema.safeParse(password.value);

  if (parsedPassword.success) {
    return "";
  }

  return parsedPassword.error.issues[0].message;
});

const passwordConfirmationError = computed(() => {
  if (password.value !== passwordConfirmation.value) {
    return "Passwords do not match";
  }

  return "";
});
</script>

<template>
  <form>
    <div>
      <label for="email">
        Email
      </label>
      <input id="email" type="email" v-model="email" required autofocus>
      <small class="error" v-if="emailError">
        {{ emailError }}
      </small>
    </div>
    <div>
      <label for="password">
        Password
      </label>
      <input id="password" type="password" v-model="password" required>
      <small class="error" v-if="passwordError">
        {{ passwordError }}
      </small>
    </div>
    <div>
      <label for="password-confirmation">
        Password Confirmation
      </label>
      <input id="password-confirmation" type="password" v-model="passwordConfirmation" required>
      <small class="error" v-if="passwordConfirmationError">
        {{ passwordConfirmationError }}
      </small>
    </div>
  </form>
</template>

<style scoped>
.error {
  color: red;
  display: block;
  padding-left: 20px;
}
</style>
