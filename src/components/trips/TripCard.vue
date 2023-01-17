<template>
  <v-card
    color="rgb(15, 10, 40)"
    rounded="lg"
    width="300px"
    height="auto"
    class="test mx-auto my-12"
    elevation="10"
  >
    <v-card color="white" elevation="0" rounded="">
      <v-img :src="thumbnail" height="200px" />
    </v-card>
    <v-card-title> {{ trip.title }}</v-card-title>
    <v-divider thickness="1.5"></v-divider>
    <v-card-text>{{ trip.description }}</v-card-text>
    <v-container class="">
      <v-row class="mx-4 my-auto" allign="center" justify="space-around">
        <v-btn class="" color="rgb(132, 50, 121)" :to="`/trips/${trip.id}`"
          >View</v-btn
        >
        <v-card-text class="mx-4 text-h4">{{
          !!trip.price ? `$${trip.price}` : `Free`
        }}</v-card-text>
        <v-card-text class="text-body-1">{{
          `${trip.number_of_spots - trip.number_of_signups} spots left`
        }}</v-card-text>
      </v-row>
    </v-container>
  </v-card>
</template>
<script setup>
import { ref } from "@vue/reactivity";

const props = defineProps({
  trip: {},
});

const thumbnail = ref(props.trip.img_urls[0]);
</script>