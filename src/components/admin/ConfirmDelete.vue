<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props">
        <v-icon icon="mdi-delete" size="large" color="white"></v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto pa-8" height="12rem">
      <v-row justify="center">
        <v-card-text class="text-h5">
          Are you sure you want to delete {{ props.name }}?
        </v-card-text>
      </v-row>
      <v-row justify="center">
        <v-card-actions>
          <v-col>
            <v-btn color="primary" @click="$emit('confirmDelete', props.name)">
              Yes
            </v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" @click="dialog = false"> Cancel </v-btn>
          </v-col>
        </v-card-actions>
      </v-row>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "vue";

const emit = defineEmits(["confirmDelete"]);

const dialog = ref(false);
const props = defineProps({
  name: "",
});
</script>