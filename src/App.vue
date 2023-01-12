<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <v-app theme="dark">
    <Navbar />
    <RouterView />
  </v-app>
</template>
