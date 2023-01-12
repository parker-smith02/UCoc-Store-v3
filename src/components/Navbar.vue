<template>
  <v-app-bar color="dark-grey" class="pa-2">
    <v-app-bar-nav-icon>
      <img class="logo" src="../assets/logo.png" />
    </v-app-bar-nav-icon>
    <v-app-bar-title>UConn Outing Club</v-app-bar-title>
    <v-btn
      class="px-6"
      variant="text"
      height="100%"
      rounded="0"
      @click="router.push('/')"
      >Home</v-btn
    >
    <v-btn
      class="px-6"
      variant="text"
      height="100%"
      rounded="0"
      @click="router.push('/trips')"
      >Trips</v-btn
    >
    <v-btn
      class="px-6"
      variant="text"
      height="100%"
      rounded="0"
      @click="router.push('group_orders')"
      >Group Orders</v-btn
    >
    <v-btn
      class="px-6"
      variant="text"
      height="100%"
      rounded="0"
      @click="router.push('/about')"
      >About</v-btn
    >
    <v-btn
      class="px-6"
      variant="text"
      height="100%"
      rounded="0"
      @click="router.push('/how')"
      >How To Join</v-btn
    >
    <v-row>
      <v-col class="px-6">
        <v-badge :content="store.cartSize">
          <v-btn
            icon="mdi-cart-outline"
            @click="!!store.cartSize ? router.push('/cart') : null"
          ></v-btn>
        </v-badge>
      </v-col>
    </v-row>
  </v-app-bar>
  <v-snackbar v-model="store.snackbar" timeout="3000">
    <p class="text-body-1 ma-auto">Item Added To Cart</p>
  </v-snackbar>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useCartStore } from "../stores/primary.js";
import { supabase } from "../supabase";
import logo from "../assets/logo.png";
import router from "../router";

const store = useCartStore();

onMounted(async () => {});
</script>
<style scoped>
.logo {
  height: 100%;
  width: 100%;
}

.cart-status {
  left: -20px;
  top: -10px;
  z-index: 10;
}
</style>