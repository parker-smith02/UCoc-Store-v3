<template>
  <v-spacer class="mb-12"></v-spacer>
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