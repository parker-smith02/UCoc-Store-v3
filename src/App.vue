<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import MobileNavbar from "./components/MobileNavbar.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();
</script>

<template>
  <v-app theme="dark">
    <Navbar v-if="!mobile" />
    <MobileNavbar v-else />
    <v-main class="my-4">
      <RouterView />
    </v-main>
  </v-app>
</template>
