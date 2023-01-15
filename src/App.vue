<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <v-app theme="dark">
    <Navbar />
    <v-main class="my-4">
      <RouterView />
    </v-main>
  </v-app>
</template>
