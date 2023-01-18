<template>
  <v-app-bar>
    <v-app-bar-nav-icon @click="router.push('/')">
      <img class="logo" src="../assets/logo.png" />
    </v-app-bar-nav-icon>
    <v-row justify="space-around">
      <v-col class="ma-auto">
        <v-app-bar-title class="text-center mx-4"
          >UConn Outing Club</v-app-bar-title
        >
      </v-col>
      <v-col class="px-6 my-1">
        <v-badge :content="store.cartSize" :key="cartKey">
          <v-btn
            icon="mdi-cart-outline"
            @click="!!store.cartSize ? router.push('/cart') : null"
          ></v-btn>
        </v-badge>
      </v-col>
    </v-row>
  </v-app-bar>
  <v-bottom-navigation elevation="20" color="black">
    <v-btn @click="router.push('/')"> Home </v-btn>
    <v-btn @click="router.push('/trips')"> Trips </v-btn>
    <v-btn @click="router.push('/gear')"> Gear </v-btn>
    <v-btn>
      <v-app-bar-nav-icon />
      <v-menu activator="parent">
        <v-list>
          <v-list-item>
            <v-btn width="100%" @click="router.push('/group_orders')"
              >Group Orders</v-btn
            >
          </v-list-item>
          <v-list-item>
            <v-btn width="100%" @click="router.push('/about')">About </v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn width="100%" @click="router.push('/how')"
              >How to Join
            </v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useCartStore } from "../stores/primary.js";
import { supabase } from "../supabase";
import logo from "../assets/logo.png";
import router from "../router";

const store = useCartStore();
const cartKey = ref(0);

watch(store.cartSize, () => {
  cartKey.value++;
});

onMounted(async () => {});
</script>
<style scoped>
.logo {
  height: 100%;
  width: 100%;
}
</style>