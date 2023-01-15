<template>
  <v-card title="Buy Merch" width="100%" rounded="0">
    <v-container>
      <v-col cols="12">
        <v-row>
          <ProductCard
            class="ma-8"
            v-for="product in store.products"
            :key="product.name"
            :product="product"
          />
        </v-row>
      </v-col>
    </v-container>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { useMerchStore } from "../../stores/primary";
import ProductCard from "./ProductCard.vue";

const loading = ref(false);
const store = useMerchStore();

onMounted(async () => {
  store.fetchMerch();
});
</script>