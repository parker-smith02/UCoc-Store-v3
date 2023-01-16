<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="12">
        <v-card class="pa-2">
          <v-card-title>Gear Rentals</v-card-title>
          <v-card-text class="text-body-1">
            Use this page to request gear from us. Heres a few reminders about
            renting gear:
          </v-card-text>
          <v-divider></v-divider>
          <v-list>
            <v-list-item>
              Gear rentals are for members who have paid dues, and are always
              free of charge.
            </v-list-item>
            <v-list-item>
              Gear can be picked up and returned at our Wednesday meetings.
            </v-list-item>
            <v-list-item>
              Borrowed gear is your responsibility, please dont lose it.
            </v-list-item>
            <v-list-item>
              Avaliablity on this page does not guarentee we have your size
              avaliable.
            </v-list-item>
            <v-list-item>
              Please return items the week after you borrow them. If you wish to
              borow gear for a longer time, talk to an officer or gear manager
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <CategoryCard
        v-for="category in categories"
        :key="category"
        :category="category"
        :items="gear.filter((item) => item.category === category)"
        :backpack="category === 'Backpacks'"
        @table-changed="category = category"
      />
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useGearStore } from "../stores/primary";
import CategoryCard from "../components/gear/CategoryCard.vue";

const gearStore = useGearStore();
const gear = ref([]);
const categories = ref([
  "Camping",
  "Backpacks",
  "Climbing",
  "Ski",
  "Winter",
  "Mountaineering",
  "Water",
  "Other",
]);

onMounted(() => {
  initializeGear();
});

const initializeGear = async () => {
  await gearStore.fetchGear();
  gear.value = gearStore.gear;
};
</script>