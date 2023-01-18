<template>
  <v-spacer class="mb-12"></v-spacer>
  <v-card class="ma-4">
    <v-card-title>A note about trips:</v-card-title>
    <v-card-text class="text-body-1"
      >Not all trips are posted on our website. Many of our member led trips are
      only presented durring our meetings. Come to our meeting Wednesdays at
      9:00pm in TLS 154 to hear about all of our trips!</v-card-text
    >
  </v-card>
  <v-card>
    <v-card-title>Upcoming Trips</v-card-title>
    <v-col>
      <v-row>
        <TripCard
          class="ma-8"
          v-for="trip in store.trips"
          :key="trip"
          :trip="trip"
        />
      </v-row>
    </v-col>
  </v-card>
</template>
<script setup>
import Navbar from "../components/Navbar.vue";
import TripCard from "../components/trips/TripCard.vue";
import { useTripStore } from "../stores/primary";
import { ref, onMounted } from "vue";

const store = useTripStore();

onMounted(async () => {
  await store.fetchTrips();
});
</script>