<template>
  <v-card class="pa-8" height="auto">
    <v-row>
      <v-col :cols="mobile ? 12 : 6">
        <v-carousel height="32rem" :key="carouselKey">
          <v-carousel-item
            v-for="image in trip.img_urls"
            :key="image"
            :src="image"
          ></v-carousel-item
        ></v-carousel>
      </v-col>
      <v-col :cols="mobile ? 12 : 6">
        <v-card-title v-if="!mobile" class="text-h2 pa-6">{{
          trip.title
        }}</v-card-title>
        <v-card-title v-else class="pa-6 text-h5"
          >{{ trip.title }}
        </v-card-title>
        <v-row>
          <v-col :class="mobile ? `ma-2` : null">
            <v-card-text class="text-h5 my-8 text-grey">{{
              !!trip.price ? `$${trip.price}` : `Free`
            }}</v-card-text>
          </v-col>
          <v-col class="my-auto">
            <v-chip :color="calculateColor()">
              {{ trip.activity_level }}
            </v-chip>
          </v-col>
          <v-col>
            <v-card-text class="my-8 text-body-1">
              <v-icon icon="mdi-map-marker" class="mx-2" />{{
                trip.location
              }}</v-card-text
            >
          </v-col>
        </v-row>
        <v-card-text class="text-body-1 text-grey">{{
          trip.description
        }}</v-card-text>
        <v-divider></v-divider>
        <v-card-text class="text-body-1 text-grey"
          >{{ avaliableSpots }} spots left</v-card-text
        >
        <v-row>
          <v-list density="compact">
            <v-list-subheader>Things to Bring</v-list-subheader>
            <v-list-item v-for="item in trip.things_to_bring" :key="item">{{
              item
            }}</v-list-item>
          </v-list>
          <v-btn class="ma-auto" color="rgb(15, 10, 40)">Sign Up</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useTripStore } from "../../stores/primary";

const tripStore = useTripStore();
const { mobile } = useDisplay();
const route = useRoute();
const router = useRouter();
const trip = ref({});
const fetchTrip = tripStore.getTripById;
const carouselKey = ref(0);
const avaliableSpots = ref();

onMounted(() => {
  trip.value = fetchTrip(route.params.id);
  carouselKey.value++;
  avaliableSpots.value =
    trip.value.number_of_spots - trip.value.number_of_signups;
});

const calculateColor = () => {
  console.log(trip.value.activity_level);
  if (trip.value.activity_level === "beginner") return `green`;
  if (trip.value.activity_level === "moderate") return `yellow`;
  if (trip.value.activity_level === "advanced") return `orang`;
  if (trip.value.activity_level === "extreme") return `red`;
};
</script>