<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="12" md="6">
        <v-card class="profile-card pa-6 mx-auto" rounded="lg" elevation="1">
          <!-- Confirm Dialog -->
          <v-dialog v-model="dialogSaved" max-width="500">
            <v-card class="pa-4">
              <v-card-title class="text-h6 d-flex align-center">
                <v-icon color="warning" class="mr-2">mdi-alert-circle-outline</v-icon>
                Confirm Changes
              </v-card-title>
              <v-card-text class="text-body-4">
                Are you sure you want to change information
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn color="grey darken-1" variant="text" @click="dialogSaved = false">
                  Cancel
                </v-btn>
                <v-btn color="success" @click="saveChanges"> Confirm </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Success Dialog -->
          <v-dialog
            class="rounded-lg"
            v-model="successDialog"
            transition="dialog-transition"
            max-width="500"
          >
            <v-card class="pa-4 text-center">
              <div>
                <v-icon color="success" size="100" class="mb-2">mdi-check-circle</v-icon>
              </div>
              <v-card-title class="text-h6 font-weight-bold">
                Changes Saved Successfully!
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn color="success" variant="flat" @click="successDialog = false"> OK </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- Card Show User Info -->
          <v-row class="my-1 d-flex justify-space-between">
            <v-col cols="12" lg="4" md="6">
              <h1 class="text-h6 font-weight-bold mb-1">{{ user.name }}</h1>
              <p class="text-subtitle-1 text-grey-darken-1 mb-2">{{ user.email }}</p>
            </v-col>
            <v-col class="text-right">
              <v-btn
                width="120"
                color="success"
                variant="outlined"
                prepend-icon="mdi-pencil-box"
                @click="openEditDialog"
                >Edit</v-btn
              ></v-col
            >
          </v-row>

          <!-- Contact Information -->
          <v-card variant="flat" class="mb-4 pa-2 bg-grey-lighten-4" rounded="lg">
            <h4 class="font-weight-bold mb-4">
              <v-icon color="primary" class="me-2">mdi-card-account-details</v-icon>
              Contact Information
            </h4>
            <v-row>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-icon color="blue-darken-1" class="me-3">mdi-email</v-icon>
                <div>
                  <div class="text-grey-darken-1">User name</div>
                  <div class="text-body-1">{{ user.username }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-icon color="green-darken-1" class="me-3">mdi-phone</v-icon>
                <div>
                  <strong class="text-grey-darken-1">Phone</strong>
                  <div class="text-body-1">{{ user.phone }}</div>
                </div>
              </v-col>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-icon color="purple-darken-1" class="me-3">mdi-web</v-icon>
                <div>
                  <div class="text-grey-darken-1">Website</div>
                  <a
                    :href="'https://' + user.website"
                    target="_blank"
                    class="text-body-1 text-decoration-none"
                  >
                    {{ user.website }}
                  </a>
                </div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Company Information -->
          <v-card variant="flat" class="mb-3 pa-4 bg-grey-lighten-4" rounded="lg">
            <h4 class="font-weight-bold mb-4">
              <v-icon color="blue-darken-2" class="me-2">mdi-domain</v-icon>
              Company Information
            </h4>
            <v-row>
              <v-col cols="12" md="4">
                <strong class="text-grey-darken-1 mb-1">Company Name</strong>
                <div class="text-body-1">{{ user.company.name }}</div>
              </v-col>
              <v-col cols="12" md="4" class="mb-2">
                <strong class="text-grey-darken-1 mb-1">Catch Phrase</strong>
                <div class="text-body-1 font-italic">{{ user.company.catchPhrase }}</div>
              </v-col>
              <v-col cols="12" md="4">
                <strong class="text-grey-darken-1 mb-1">BS :</strong>
                <div class="text-body-1">{{ user.company.bs }}</div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Address Information -->
          <v-card variant="flat" class="mb-1 pa-4 bg-grey-lighten-4" rounded="lg">
            <h4 class="font-weight-bold mb-4">
              <v-icon color="green-darken-2">mdi-map-marker</v-icon>
              Address & Location
            </h4>
            <v-row>
              <v-col cols="12" md="6">
                <strong class="text-grey-darken-1 mb-1">Full Address</strong>
                <div class="text-body-1">
                  {{ user.address.street }} - {{ user.address.suite }} - {{ user.address.city }},
                  {{ user.address.zipcode }}
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <strong class="text-grey-darken-1 mb-1">Geographic Coordinates</strong>
                <div class="text-body-1">
                  Latitude: {{ user.address.geo.lat }} - Longitude: {{ user.address.geo.lng }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>

        <!-- Dialog for Editing -->
        <v-dialog v-model="dialog" max-width="800px">
          <v-card class="pa-3 py-3">
            <v-card-title class="text-primary font-weight-bold">Edit User Information</v-card-title>
            <v-row>
              <v-col cols="12" md="6" sm="12">
                <v-text-field v-model="updatedUser.name" label="Name" outlined dense></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.email"
                  label="Email"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.phone"
                  label="Phone"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.website"
                  label="Website"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.company.name"
                  label="Company Name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.company.catchPhrase"
                  label="Catch Phrase"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.company.bs"
                  label="BS"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.address.street"
                  label="Street"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.address.suite"
                  label="Suite"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.address.city"
                  label="City"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.address.zipcode"
                  label="Zipcode"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" sm="12">
                <v-text-field
                  v-model="updatedUser.address.geo.lat"
                  label="Latitude"
                  outlined
                  dense
                ></v-text-field
              ></v-col>
              <v-col cols="12" md="12" sm="12">
                <v-text-field
                  v-model="updatedUser.address.geo.lng"
                  label="Longitude"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-card-actions>
                  <v-btn color="red" @click="dialog = false">Cancel</v-btn>
                  <v-btn color="green" @click="openDialogSaved">Save</v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <!-- Show Related User Posts -->
    <!-- Header -->
    <v-row>
      <v-col cols="12" class="d-flex ga-2">
        <v-icon class="ml-2" size="32" color="primary">mdi-post-outline</v-icon>
        <h2 class="font-weight-bold">Latest Posts</h2>
      </v-col>
    </v-row>
    <!--User Posts -->
    <v-row class="mt-4">
      <v-col v-for="post in userPosts" :key="post.id" cols="12" sm="6" md="6">
        <v-card class="post-card" elevation="6">
          <v-card-title class="font-weight-bold">
            {{ post.title }}
          </v-card-title>
          <v-card-text class="text-body-2 text-grey-darken-1">
            {{ post.body }}
          </v-card-text>
          <v-card-actions class="my-2 text-right">
            <v-btn :to="`/post/${post.id}`" color="primary" variant="outlined">
              Read More Comments
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const dialog = ref(false)
const dialogSaved = ref(false)
const successDialog = ref(false)
const error = ref(null)
const posts = reactive({})
const userPosts = ref([])
const updatedUser = ref({
  name: user.value?.name,
  email: user.value?.email,
  phone: user.value?.phone,
  website: user.value?.website,
  company: {
    name: user.value?.company?.name,
    catchPhrase: user.value?.company?.catchPhrase,
    bs: user.value?.company?.bs,
  },
  address: {
    street: user.value?.address?.street,
    suite: user.value?.address?.suite,
    city: user.value?.address?.city,
    zipcode: user.value?.address?.zipcode,
    geo: {
      lat: user.value?.address?.geo?.lat,
      lng: user.value?.address?.geo?.lng,
    },
  },
})

const openEditDialog = () => {
  dialog.value = true
  // Initialize updatedUser with current user data
  updatedUser.value = { ...user.value }
}
const openDialogSaved = () => {
  dialogSaved.value = true
}
const saveChanges = async () => {
  const userid = route.params.id
  try {
    error.value = null // Reset any previous error messages
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${userid}`,
      updatedUser.value,
    )
    // Update the user data in the store after saving changes
    authStore.updateUser(response.data)
    dialogSaved.value = false
    dialog.value = false
    successDialog.value = true
  } catch (err) {
    console.error('Error updating user:', err)
    error.value = 'Failed to save changes. Please try again.'
  }
}
const fetchPostDetails = async () => {
  const postId = route.params.id
  console.log(postId)

  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    posts.value = response.data
    console.log(posts.value)
    fetchUserPosts(posts.value.userId)
  } catch (err) {
    console.log('Error fetching post or comments:', err)
  }
}
const fetchUserPosts = async (userId) => {
  if (!userId) return

  try {
    const postsResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
    )
    userPosts.value = postsResponse.data
    console.log('User Posts:', userPosts.value)
  } catch (err) {
    console.error('Error fetching user posts:', err)
  }
}
onMounted(() => {
  fetchPostDetails()
})
</script>

<style scoped>
.profile-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}
.v-text-field {
  height: 40px;
}
</style>
