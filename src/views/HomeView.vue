<template>
  <v-main>
    <v-spacer class="mb-12" />
    <MerchItems />
  </v-main>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import MerchItems from "../components/home/MerchItems.vue";
import { onMounted } from "@vue/runtime-core";
import { useOrdersStore } from "../stores/primary";

const orderStore = useOrdersStore();

onMounted(() => {
  orderStore.reset();
});
</script>