<template>
  <v-card
    width="64rem"
    title="Active Members"
    elevation="10"
    rounded="lg"
    class="pa-8 ma-8"
  >
    <v-text-field
      v-model="searchQuery"
      label="Search"
      type="input"
    ></v-text-field>
    <v-table height="32rem">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Phone Number</th>
          <th class="text-left">Paid Dues?</th>
          <th class="text-left">Checked Out Gear</th>
          <th class="text-left">Trips Signed Up For</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="member in filteredMembers" :key="member.id">
          <td>{{ member.first_name }} {{ member.last_name }}</td>
          <td>{{ member.email }}</td>
          <td>
            <v-chip color="orange" v-if="!member.phone_number"
              >None on File</v-chip
            >
            {{ member.phone_number }}
          </td>
          <td>
            <v-chip color="green" v-if="member.dues">Yes</v-chip>
            <v-chip color="red" v-else>No</v-chip>
          </td>
          <td>
            <v-chip v-if="!member.checked_out_gear">None</v-chip>
            {{ member.checked_out_gear }}
          </td>
          <td>
            <v-chip v-if="!member.trips_signed_up_for">None</v-chip>
            {{ member.trips_signed_up_for }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

const props = defineProps({
  members: [],
});
const searchQuery = ref("");
const filteredMembers = computed(() => {
  return props.members.filter((member) => {
    const name = `${member.first_name.toLowerCase()} ${
      member.last_name.toLowerCase()
    }`;
    return name.includes(searchQuery.value.toLowerCase());
  });
});
</script>
