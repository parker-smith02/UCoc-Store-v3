<template>
  <td v-if="!props.confirm">
    <v-btn
      icon="mdi-delete"
      color="rgb(15, 10, 40)"
      @click="handleDelete"
    ></v-btn>
  </td>
  <td class="pa-4">
    <v-img :src="thumbnail" height="100px" width="100px" />
  </td>
  <td class="text-body-1 text-left">{{ product.name }}</td>
  <td class="text-body-1 text-left">{{ cartItem.size }}</td>
  <td class="text-body-1 text-left">{{ cartItem.color }}</td>
  <td class="text-body-1 text-left">${{ product.price }}</td>
  <td class="text-body-1 text-left">{{ cartItem.quantity }}</td>
  <td class="text-body-1 text-left">${{ subtotal }}</td>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { useCartStore, useMerchStore } from "../../stores/primary";

const merchStore = useMerchStore();
const cartStore = useCartStore();
const product = ref({});
const fetchProduct = merchStore.getProductByName;
const thumbnail = ref("");
const subtotal = ref(0);

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
});

const handleDelete = () => {
  cartStore.removeItem(product.name);
};
</script>