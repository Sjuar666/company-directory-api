<template>
  <div class="flex justify-center items-center min-h-screen bg-black">
    <form class="bg-gray-800 p-10 shadow-md rounded-lg">
      <div>
        <label for="username" class="block mb-2 font-bold text-white">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Username"
          class="w-full border border-gray-600 p-2 rounded bg-gray-900 text-white"
        />
      </div>
      <div class="mt-4">
        <label for="password" class="block mb-2 font-bold text-white">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full border border-gray-600 p-2 rounded bg-gray-900 text-white"
        />
      </div>
      <button
        @click="logUserIn"
        class="bg-green-500 text-white w-full mt-6 px-4 py-2 rounded hover:bg-green-800 transition-all"
      >
        LOGIN
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuth } from '../composables/useAuth'

const { login, logout } = useAuth()

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')

const logUserIn = async () => {
    if (await login(username.value, password.value)) {
        if (route.query.redirect) {
            router.push(route.query.redirect)
        } else {
            router.push({name: 'SettingsPage'})
        }
    } else {
        logout()
    }
}

</script>