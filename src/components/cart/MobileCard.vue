<template>
  <v-card color="rgb(15, 10, 40)" class="pa-4" elevation="10">
    <v-card-title>{{ product.name }}</v-card-title>
    <v-row>
      <v-col>
        <v-img :src="thumbnail" height="auto" width="auto" />
      </v-col>
      <v-col>
        <v-card-text> Size: {{ cartItem.size }} </v-card-text>
        <v-card-text> Color: {{ cartItem.color }} </v-card-text>
        <v-card-text> ${{ product.price }} </v-card-text>
        <v-card-text> Quantity: {{ cartItem.quantity }} </v-card-text>
      </v-col>
    </v-row>
    <v-card-actions @click="handleDelete" v-if="!props.confirm">
      <v-icon icon="mdi-delete" />
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { useCartStore, useMerchStore } from "../../stores/primary";
import { loadStripe } from "@stripe/stripe-js";

const merchStore = useMerchStore();
const cartStore = useCartStore();
const product = ref({});
const fetchProduct = merchStore.getProductByName;
const thumbnail = ref("");
const subtotal = ref(0);
const loading = ref(false);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const props = defineProps({
  cartItem: {},
  confirm: false,
});

const calculateSubtotal = () => {
  return props.cartItem.quantity * product.value.price;
};

onMounted(() => {
  product.value = fetchProduct(props.cartItem.product);
  thumbnail.value = product.value.img_urls[0];
  subtotal.value = calculateSubtotal();
  console.log(props.cartItem);
});

const handleDelete = () => {
  cartStore.removeItem(product.name);
};
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

const handleCheckout = async () => {
  loading.value = true;

  const stripe = await stripePromise;
  const itemsArr = formatStripeArray();
  const { error } = await stripe.redirectToCheckout({
    lineItems: itemsArr,
    mode: "payment",
    cancelUrl: window.location.origin,
    successUrl: `${window.location.origin}/thankyou`,
  });
};
</script>