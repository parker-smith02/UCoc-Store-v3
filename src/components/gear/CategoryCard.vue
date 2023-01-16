<template>
  <v-col :cols="mobile ? 12 : 6">
    <v-card class="ma-4">
      <v-card-title>
        Avaliable {{ props.category }} {{ props.backpack ? "" : "Gear" }}
      </v-card-title>
      <GearRow
        v-for="item in items"
        :key="item"
        :item="item"
        @table-changed="handleTableChanged"
      />
    </v-card>
  </v-col>
</template>
<script setup>
import { defineProps } from "vue";
import GearRow from "./GearRow.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const emit = defineEmits(["tableChanged"]);
const props = defineProps({
  category: "",
  items: Array,
  backpack: false,
});
const { mobile } = useDisplay();

const handleTableChanged = () => {
  emit("tableChanged");
};
</script>