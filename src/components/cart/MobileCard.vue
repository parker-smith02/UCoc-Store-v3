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
    <v-card-actions @click="handleDelete">
      <v-icon icon="mdi-delete" />
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { ref, onMounted } from "vue-demi";
import { useCartStore, useMerchStore } from "../../stores/primary";

const merchStore = useMerchStore();
const cartStore = useCartStore();
const product = ref({});
const fetchProduct = merchStore.getProductByName;
const thumbnail = ref("");
const subtotal = ref(0);

const props = defineProps({
  cartItem: {},
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
</script>