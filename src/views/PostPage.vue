<script setup>
import { url } from '@/config'
import axios from 'axios'
import { ref, onMounted } from 'vue'
const Posts = ref([])
const loading = ref(false)
const page = ref(1)
const limit = ref(10)

const loadPosts = async () => {
  if (loading.value) return

  try {
    loading.value = true
    const response = await axios.get(`${url}/posts`, {
      params: {
        _page: page.value,
        _limit: limit.value,
      },
    })

    Posts.value.push(...response.data)
    page.value++
  } catch (err) {
    console.log(err)
  } finally {
    loading.value = false
  }
}
const handleScroll = () => {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = document.documentElement.scrollTop

  if (windowHeight + scrollTop >= documentHeight - 100 && !loading.value) {
    loadPosts()
  }
}
onMounted(() => {
  loadPosts()
  window.addEventListener('scroll', handleScroll)
})
</script>
<template>
  <!-- Sceleton Loader  -->
  <v-container v-if="loading">
    <v-row>
      <v-col v-for="(i, n) in 6" :key="n" cols="12" md="6" class="">
        <v-skeleton-loader type="article"></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
  <v-container max-width="100%">
    <v-row>
      <v-col cols="12" md="6" class="d-flex align-center">
        <v-icon color="primary" class="mr-2">mdi-post-outline</v-icon>
        <h2 class="text-grey-darken-5 ma-3">All Posts</h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="post in Posts" :key="post.id" cols="12" md="6">
        <v-card class="mb-4" elevation="3">
          <!-- Link To Show details -->

          <v-card-subtitle class="d-flex align-center">
            <v-icon color="secondary" class="mr-1 my-4">mdi-account</v-icon> User ID:
            <strong>{{ post.userId }}</strong>
            <v-spacer></v-spacer>
            ID:
            <strong>{{ post.id }}</strong>
          </v-card-subtitle>

          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
          <v-card-actions class="d-flex justify-end">
            <router-link :to="`/post/${post.id}`">
              <v-btn color="primary" variant="outlined"> Show Details</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
