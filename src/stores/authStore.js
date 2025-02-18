import { defineStore } from 'pinia'
import axios from 'axios'
import { url } from '@/config'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    errorMessage: '',
  }),

  getters: {
    getUser: (state) => state.user,
    getErrorMessage: (state) => state.errorMessage,
  },

  actions: {
    async login(username, email, rememberMe) {
      try {
        const response = await axios.get(`${url}/users`)
        const users = response.data
        const user = users.find((u) => u.username === username && u.email === email)
        if (!user) {
          this.errorMessage = 'Invalid username or email. Please try again.'
          return false
        }
        this.user = user
        this.errorMessage = ''
        if (rememberMe) {
          localStorage.setItem('user', JSON.stringify(user))
        }
        return true
      } catch (error) {
        this.errorMessage = error
        return false
      }
    },

    async updateUser(updatedUser) {
      try {
        const response = await axios.put(`${url}/users/${updatedUser.id}`, updatedUser)

        this.user = response.data
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (error) {
        this.errorMessage = 'Failed to update user data. Please try again.'
        console.error('Error updating user:', error)
      }
    },

    logout() {
      this.user = {}
      localStorage.removeItem('user')
    },

    checkAuth() {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
      }
    },
  },
})
