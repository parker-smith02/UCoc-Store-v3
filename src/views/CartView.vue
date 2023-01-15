<template>
  <v-main class="ma-4">
    <v-card class="pa-8" height="auto">
      <v-card-title>{{ cartStore.cartSize }} Items in Cart</v-card-title>
      <v-btn @click="reset">clear cart</v-btn>
      <template v-if="!mobile">
        <v-row>
          <v-col cols="8">
            <v-table>
              <thead>
                <tr>
                  <th class="text-left"></th>
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
                  <CartRow :cart-item="item" />
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="text-body-1">Total:</td>
                  <td class="text-body-1">${{ cartStore.cartTotal }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
          <v-col class="ma-4">
            <v-card color="black" class="my-4">
              <v-card-text class="text-body-1">
                Reminder: All purchased items can be picked up at any of our
                club meetings on Wednesdays at 9:00pm in TLS 154. Unfortunately,
                we cannot ship items at this time.
              </v-card-text>
            </v-card>
            <v-divider class="my-4"></v-divider>
            <v-form ref="form" v-model="valid">
              <v-text-field
                :rules="[(v) => (v || '').length > 0 || 'Required']"
                label="Name"
                hint="First, Last"
                v-model="orderName"
              ></v-text-field>
              <v-text-field
                :rules="[(v) => (v || '').length > 0 || 'Required']"
                label="UConn Email"
                v-model="orderEmail"
              ></v-text-field>
              <v-btn
                :disabled="loading"
                class="text-body-1"
                color="rgb(15, 10, 40)"
                @click.prevent="handleCheckout"
                >Go To Checkout</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-main class="ma-4">
          <MobileCard
            class="ma-4"
            v-for="item in cartStore.items"
            :key="item"
            :cart-item="item"
          />
          <v-btn class="my-4" color="black" @click="handleCheckout"
            >Go To Checkout</v-btn
          >
        </v-main>
      </template>
    </v-card>
  </v-main>
</template>
<script setup>
import VerifyEmail from "../components/SharedComponents/VerifyEmail.vue";
import Navbar from "../components/Navbar.vue";
import { useCartStore, useMerchStore, useOrdersStore } from "../stores/primary";
import CartRow from "../components/cart/CartRow.vue";
import MobileCard from "../components/cart/MobileCard.vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify";
import { onMounted, ref } from "@vue/runtime-core";
import { loadStripe } from "@stripe/stripe-js";
import { v4 as uuidv4 } from "uuid";

const router = useRouter();
const cartStore = useCartStore();
const merchStore = useMerchStore();
const ordersStore = useOrdersStore();
const { mobile } = useDisplay();
const email = ref("");
const loading = ref(false);
const orderName = ref("");
const orderEmail = ref("");
const valid = ref(false);
const form = ref(null);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const fetchProduct = merchStore.getProductByName;

onMounted(() => {
  console.log(mobile.value);
});

const reset = () => {
  cartStore.items = [];
  cartStore.cartSize = 0;
  cartStore.cartTotal = 0;
  console.log("cart reset");
  router.push("/");
};

const formatStripeArray = () => {
  let arr = [];
  cartStore.items.forEach((item) => {
    const product = fetchProduct(item.product);
    arr.push({
      price: product.api_id,
      quantity: item.quantity,
    });
  });
  return arr;
};

const addOrderToStore = (items) => {
  ordersStore.reset();
  const uuid = uuidv4();
  console.log("adding to store");
  ordersStore.orders.push({
    id: uuid,
    name: orderName.value,
    email: orderEmail.value,
    items: items,
    price: cartStore.cartTotal,
    type: "merch",
  });
};

const handleCheckout = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;

    const stripe = await stripePromise;
    const itemsArr = formatStripeArray();
    addOrderToStore(cartStore.items);
    const { error } = await stripe.redirectToCheckout({
      lineItems: itemsArr,
      mode: "payment",
      cancelUrl: window.location.origin,
      successUrl: `${window.location.origin}/confirmation`,
    });

    if (error) {
      console.log(error);
      loading.value = false;
      return false;
    }
  }
};
</script>