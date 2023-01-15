<template>
  <td></td>
</template>
<script setup>
import { defineProps, onMounted, ref } from "vue";
import { useMerchStore } from "../../stores/primary";

const store = useMerchStore();
const fetchProduct = store.getProductById;
const productDetails = ref("");

const props = defineProps({
  item: {},
});

onMounted(() => {
  productDetails.value = fetchProduct(props.item);
  console.log(productDetails.value);
});
</script>