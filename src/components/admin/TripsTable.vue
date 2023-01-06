<template>
    <v-card
      width="64rem"
      class="pb-8 ma-8"
      elevation="10"
      rounded="lg"
      title="Current Trips"
    >
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Title</th>
            <th class="text-left">Description</th>
            <th class="text-left">Location</th>
            <th class="text-left">Start Date</th>
            <th class="text-left">End Date</th>
            <th class="text-left">Activity Level</th>
            <th class="text-left">Things To Bring</th>
            <th class="text-left">Number of Spots</th>
            <th class="text-left">Number of Signups</th>
          </tr>
        </thead>
        <tbody class="pa-8">
          <tr v-for="trip in trips" :key="trip.title">
            <td>{{ trip.title }}</td>
            <td>{{ trip.description }}</td>
            <td>{{ trip.location }}</td>
            <td>
              <ul>
                <li v-for="item in trip.things_to_bring" :key="item">{{ item }}</li>
              </ul>
            </td>
            <td>{{ trip.start_date }}</td>
            <td>{{ trip.end_date }}</td>
            <td>{{ trip.activity_level }}</td>
            <td>{{ trip.number_of_spots }}</td>
            <td>{{ trip.number_of_signups }}</td>
            <td>
              <ConfirmDelete :name="trip.title" @confirm-delete="handleDelete" />
            </td>
          </tr>
        </tbody>
      </v-table>
      <AddTripForm class="pt-12" @form-submit="handleFormSubmit" />
    </v-card>
  </template>
    
  <script setup>
  import { ref } from "@vue/reactivity";
  import ConfirmDelete from "./ConfirmDelete.vue";
  import AddTripForm from "./AddTripForm.vue";
  import { mdiDelete } from "@mdi/js";
  import { supabase } from "../../supabase";
  
  const emit = defineEmits(["tableUpdated"]);
  const icons = ref({
    mdiDelete,
  });
  
  const props = defineProps({
    trips: {},
  });
  
  const handleFormSubmit = () => {
    emit("tableUpdated");
  };
  
  const handleDelete = async (name) => {
    const query = supabase.from("trips").delete().eq("title", name);
    const { data, error } = await query;
    if (error) {
      console.log(error);
      return false;
    }
    emit("tableUpdated");
  };
  </script>