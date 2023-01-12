<template>
  <td>TEST</td>
</template>

<script setup>
import { useMerchStore } from "../../stores/primary";

const store = useMerchStore();

const props = defineProps({
  productName: {},
});
</script>