<template>
  <v-main>
    <v-spacer class="mb-12" />
    <v-card class="ma-4 pa-2">
      <v-card-title>Welcome to UCoc!</v-card-title>
      <v-card-text class="text-body-1 text-grey"
        >Our meetings this semester are Wed at 9pm in TLS 154! The club runs
        trips for anything and everything outdoors including rock climbing, ice
        climbing, backpacking, white water rafting, camping, hiking, caving and
        much more! We will be asking for $20 in club dues. That $20 will allow
        you access to the thousand of dollars worth of gear. Feel free to email
        us with questions. We can't guarantee that we have time to answer them,
        but if you join our email list, you can at least stay in the loop with
        meetings and trips. See the how to join page for information on
        becomming a member!
      </v-card-text>
    </v-card>
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