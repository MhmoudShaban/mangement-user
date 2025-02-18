<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()
const username = ref('')
const email = ref('')
const rememberMe = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  try {
    const success = await authStore.login(username.value, email.value, rememberMe.value)
    if (success) {
      router.push('/dashboard')
    } else {
      errorMessage.value = authStore.getErrorMessage
    }
  } catch (error) {
    isLoading.value = false
    console.log(error)
    errorMessage.value = 'An unexpected error occurred. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <!-- background  -->
  <v-img src="../../src/assets/bg4.jpg" cover height="100vh" width="100%" class="background-image">
    <!-- Overlay Div-->
    <div class="overlay"></div>
    <v-container fluid class="fill-height d-flex align-center justify-center pa-0">
      <!-- Login Card -->
      <v-card class="login-card rounded-lg">
        <form @submit.prevent="handleLogin">
          <v-card-title class="text-center text-h5 font-weight-bold my-4 text-white">
            Login to Your Account
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-account"
              class="mb-3 custom-input"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              variant="outlined"
              density="comfortable"
              prepend-inner-icon="mdi-email"
              type="email"
              class="custom-input"
              required
            ></v-text-field>
            <v-checkbox
              v-model="rememberMe"
              label="Remember Me"
              color="white"
              density="comfortable"
              class="white-label"
            ></v-checkbox>
            <v-btn
              block
              type="submit"
              size="large"
              variant="elevated"
              class="mb-3 white-button"
              :disabled="isLoading"
              @click="handleLogin"
            >
              <span v-if="!isLoading">Login</span>
              <v-progress-circular
                v-if="isLoading"
                class="ml-5"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-btn>

            <p v-if="errorMessage" class="text-red text-center text-body-2 font-weight-bold">
              {{ errorMessage }}
            </p>
          </v-card-text>
        </form>
      </v-card>
    </v-container>
  </v-img>
</template>

<style scoped>
button {
  background: #3750c2;
  color: white;
  border-radius: 6px;
  font-size: 19px;
  transition: background 0.3s ease;
}

button:hover {
  background: #38448f;
}

.fill-height {
  height: 100vh !important;
}

.login-card {
  width: 800px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(130, 122, 122, 0.1);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: white;
}

.background-image {
  position: relative;
}

.overlay {
  background: rgba(83, 83, 83, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.text-white {
  color: white !important;
}

.custom-input input {
  color: white;
}

.custom-input label {
  color: white;
}

.white-label {
  color: white !important;
}

.white-button:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
