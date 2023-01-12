<template>
  <v-card
    color="rgb(15, 10, 40)"
    rounded="lg"
    width="300px"
    height="400px"
    class="test mx-auto my-12"
    elevation="10"
  >
    <v-card color="white" elevation="0" rounded="0">
      <v-img :src="thumbnail" class="thumbnaila" height="200px" />
    </v-card>
    <v-card-title>{{ product.name }}</v-card-title>
    <v-divider thickness="1.5" />
    <v-card-text>{{ product.description }}</v-card-text>
    <v-container class="">
      <v-row class="mx-4 my-auto" allign="center">
        <v-btn
          class=""
          color="rgb(132, 50, 121 )"
          :to="`/merch/${product.name}`"
          >View</v-btn
        >
        <v-card-text class="mx-4 text-h4">${{ product.price }}</v-card-text>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup>
import { onMounted, ref } from "vue-demi";

const thumbnail = ref(props.product.img_urls[0]);

const props = defineProps({
  product: {},
});
const imgUrl = ref("");

onMounted(() => {});
</script>
<style scoped>
.thumbnail {
  width: 50%;
  height: 50%;
}
</style>