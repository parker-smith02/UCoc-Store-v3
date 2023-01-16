<template>
  <v-dialog v-model="props.dialog">
    <v-row justify="space-around">
      <v-card width="auto">
        <v-card-title> Email Not Found </v-card-title>
        <v-card-text
          >We couldn't find any club member with that email. Make sure that you
          are using your uconn issues email as that is what we have on file. To
          join the club, visit the How to Join Page</v-card-text
        >
        <v-card-actions>
          <v-btn @click="$emit('close')">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-dialog>
</template>
<script setup>
import { defineProps, ref } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  dialog: false,
});
</script>