<template>
  <v-main class="ma-4">
    <v-card class="pa-8" height="auto">
      <v-card-title>{{ cartStore.cartSize }} Items in Cart</v-card-title>
      <v-btn @click="reset">clear cart</v-btn>
      <v-row>
        <v-col cols="6">
          <v-table>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">Name</th>
                <th class="text-left">Size</th>
                <th class="text-left">Color</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">SubTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartStore.items" :key="item">
                <CartRow :product-name="item" />
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import { useCartStore, useMerchStore } from "../stores/primary";
import CartRow from "../components/cart/CartRow.vue";

const cartStore = useCartStore();
const reset = () => {
  cartStore.items = [];
  cartStore.cartSize = 0;
  console.log("reset");
};
</script>