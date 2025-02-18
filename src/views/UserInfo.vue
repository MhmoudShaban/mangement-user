<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" lg="12" md="6">
        <v-card class="profile-card pa-6 mx-auto" rounded="lg" elevation="1">
          <!-- Header Section -->
          <v-row>
            <v-col cols="12">
              <h3 class="text-grey-darken-4">
                <v-icon color="primary" size="32" class="mb-1">mdi-list-box</v-icon> User
                Information
              </h3>
            </v-col>
          </v-row>
          <v-row align="center" class="my-0">
            <v-col cols="12" lg="12" class="text-center">
              <h2 class="font-weight-bold mb-1">{{ user.name }}</h2>
              <p class="text-subtitle-1 text-grey-darken-4 mb-2">{{ user.username }}</p>
            </v-col>
          </v-row>

          <!-- Contact Information -->
          <v-card variant="flat" class="mb-4 pa-4 bg-grey-lighten-4" rounded="lg">
            <h2 class="text-h6 font-weight-bold mb-4">
              <v-icon color="primary" class="me-2">mdi-card-account-details</v-icon>
              Contact Information
            </h2>
            <v-row>
              <v-col cols="12" md="4" class="d-flex align-center">
                <v-icon color="blue-darken-1" class="me-3">mdi-email</v-icon>
                <div>
                  <div class="text-grey-darken-1">Email</div>
                  <div class="text-body-1">{{ user.email }}</div>
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
          <v-card variant="flat" class="mb-6 pa-4 bg-grey-lighten-4" rounded="lg">
            <h2 class="text-h6 font-weight-bold mb-4">
              <v-icon color="blue-darken-2" class="me-2">mdi-domain</v-icon>
              Company Information
            </h2>
            <v-row>
              <v-col cols="12" md="6" class="">
                <strong class="text-grey-darken-1 mb-1">Company Name</strong>
                <div class="text-body-1">{{ user.company.name }}</div>
              </v-col>
              <v-col cols="12" md="6" class="mb-2">
                <strong class="text-grey-darken-1 mb-1">Catch Phrase</strong>
                <div class="text-body-1 font-italic">{{ user.company.catchPhrase }}</div>
              </v-col>
              <v-col cols="12">
                <strong class="text-grey-darken-1 mb-1">BS :</strong>
                <div class="text-body-1">{{ user.company.bs }}</div>
              </v-col>
            </v-row>
          </v-card>

          <!-- Address Information -->
          <v-card variant="flat" class="mb-6 pa-4 bg-grey-lighten-4" rounded="lg">
            <h2 class="text-h6 font-weight-bold mb-4">
              <v-icon color="green-darken-2">mdi-map-marker</v-icon>
              Address & Location
            </h2>
            <v-row>
              <v-col cols="12" md="6">
                <strong class="text-grey-darken-1 mb-1">Full Address</strong>
                <div class="text-body-1">
                  {{ user.address.street }}, {{ user.address.suite }}<br />
                  {{ user.address.city }}, {{ user.address.zipcode }}
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <strong class="text-grey-darken-1 mb-1">Geographic Coordinates</strong>
                <div class="text-body-1">
                  Latitude: {{ user.address.geo.lat }}<br />
                  Longitude: {{ user.address.geo.lng }}
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { computed } from 'vue'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>

<style scoped>
.profile-card {
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}
</style>
