<template>
  <v-container fluid>
    <v-row justify="end" class="mb-5 mt-3 d-flex justify-space-between align-center">
      <v-col cols="12" md="4" class="d-flex justify-space-between align-center">
        <h3 class="font-weight-bold text-grey-darken-4">
          <v-icon color="primary" class="mr-2 mb-1">mdi-account-group</v-icon>All Users
        </h3>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search User"
          variant="outlined"
          hide-details
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-skeleton-loader v-if="loading" type="table, list-item-two-line"></v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="filteredUsers"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'
import { debounce } from 'lodash'
import { url } from '@/config'

const users = ref([])
const search = ref('')
const loading = ref(false)
// headers Table
const headers = ref([
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'UserName', value: 'username' },
  { title: 'Email', value: 'email' },
  { title: 'Phone', value: 'phone' },
])
// Featch All Users
const fetchUsers = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${url}/users`)
    users.value = response.data
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}
const filteredUsers = computed(() => {
  if (!search.value) return users.value
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().startsWith(search.value.toLowerCase()) ||
      user.username.toLowerCase().startsWith(search.value.toLowerCase()),
  )
})
const debounceSearch = debounce((value) => {
  search.value = value
})
watch(search, (newval) => {
  debounceSearch(newval)
})

onMounted(() => {
  fetchUsers()
})
</script>
