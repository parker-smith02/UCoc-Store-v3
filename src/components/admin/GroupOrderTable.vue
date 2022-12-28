<template>
  <v-card
    width="64rem"
    class="pb-8 ma-8"
    elevation="10"
    rounded="lg"
    title="Active Group Orders"
  >
    <v-table>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Brand</th>
          <th class="text-left">Description</th>
          <th class="text-left">Sizes</th>
          <th class="text-left">Colors</th>
          <th class="text-left">Price</th>
          <th class="text-left">MSRP</th>
          <th class="text-left">DeadLine</th>
          <th class="text-left">Delete Item</th>
        </tr>
      </thead>
      <tbody class="pa-8">
        <tr v-for="item in items" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.brand }}</td>
          <td>{{ item.description }}</td>
          <td>
            <ul>
              <li v-for="size in item.sizes" :key="size">{{ size }}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="color in item.colors" :key="color">{{ color }}</li>
            </ul>
          </td>
          <td>{{ item.price }}</td>
          <td>{{ item.msrp }}</td>
          <td>{{ item.deadline }}</td>
          <td>
            <ConfirmDelete :name="item.name" @confirm-delete="handleDelete" />
          </td>
        </tr>
      </tbody>
    </v-table>
    <AddGroupOrderForm class="pt-12" @form-submit="handleFormSubmit" />
  </v-card>
</template>
  
   <script setup>
import { ref } from "@vue/reactivity";
import ConfirmDelete from "./ConfirmDelete.vue";
import AddGroupOrderForm from "./AddGroupOrderForm.vue";
import { mdiDelete } from "@mdi/js";
import { supabase } from "../../supabase";

const emit = defineEmits(["tableUpdated"]);
const icons = ref({
  mdiDelete,
});

const props = defineProps({
  items: {},
});

const handleFormSubmit = () => {
  emit("tableUpdated");
};

const handleDelete = async (name) => {
  const query = supabase.from("group_orders").delete().eq("name", name);
  const { data, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  emit("tableUpdated");
};
</script>