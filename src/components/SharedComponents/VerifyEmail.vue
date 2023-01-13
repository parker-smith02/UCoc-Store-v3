<template>
  <div class="text-center">
    <v-btn color="rgb(15, 10, 40)" @click="handleCheck">{{
      props.btnText
    }}</v-btn>

    <v-dialog v-model="dialog"> </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue-demi";
import { supabase } from "../../supabase";

const dialog = ref(false);
const userInfo = ref({});

const props = defineProps({
  btnText: "",
  email: "",
});

const handleCheck = () => {
  dialog.value = true;
  fetchUser();
};

const fetchUser = async () => {
  const query = supabase.from("members").select("*").eq("email", props.email);
  const { data, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  userInfo.value = data;
};
</script>