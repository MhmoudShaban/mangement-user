<script setup>
import { useAuthStore } from '@/stores/authStore'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const drawer = ref(true)
const authStore = useAuthStore()
const user = computed(() => authStore.user)
const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
<template>
  <v-layout>
    <!-- Sidebar (Navigation Drawer) -->
    <v-navigation-drawer
      app
      color="blue-grey-darken-4"
      class="px-0"
      permanent
      v-model="drawer"
      expand-on-hover
    >
      <div class="d-flex flex-column align-center py-5">
        <v-avatar size="40" class="mr-2 mt-1">
          <img src="@/assets/avatar.png" alt="Admin" />
        </v-avatar>
        <h4 class="white--text mt-2">{{ user.name }}</h4>
        <h5 class="white--text">{{ user.email }}</h5>
      </div>
      <v-divider></v-divider>
      <v-list>
        <v-list-item to="/user-info">
          <v-icon class="mr-2">mdi-account</v-icon>
          User Information
        </v-list-item>
        <v-list-item to="/Allusers">
          <v-icon class="mr-2">mdi-account-multiple</v-icon>
          All Users
        </v-list-item>
        <v-list-item to="/posts-page">
          <v-icon class="mr-2">mdi-post-outline</v-icon>
          Posts
        </v-list-item>
        <v-list-item :to="`/user-profile/${user.id}`">
          <v-icon class="mr-2">mdi-account-details</v-icon>
          Edit User Profile
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block rounded-lg color="#1eb980" @click="handleLogout">
            Logout<v-icon class="ml-2">mdi-logout</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-app-bar app flat elevation="0">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <h2 class="ml-2 text-uppercase font-weight-bold">
          <span style="color: #1eb980">User </span>Management
        </h2>
        <v-spacer></v-spacer>
        <!-- Icons -->

        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>

      <v-container fluid class="main-content">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-layout>
</template>

<style scoped>
/* Sidebar styling */

.v-navigation-drawer {
  background-color: #1e1e2d !important;
  color: white !important;
}
.v-list-item-title {
  font-size: 16px;
  font-weight: 500;
}
.v-list-group__header .v-list-item__content .v-list-item__title {
  font-weight: bold !important;
}
.v-list-group__items .v-list-item {
  padding-left: 10px !important;
}
.v-avatar {
  margin-right: 50px;
  border: 2px solid white;
}

/* Top Bar */
.v-app-bar {
  background: white !important;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
}
.logout-section {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
