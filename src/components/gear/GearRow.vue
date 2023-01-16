<template>
  <v-card class="ma-2" color="grey">
    <v-card-text class="text-black text-body-1">
      <v-row>
        <v-col>
          {{ item.name }}
        </v-col>
        <v-col class="font-weight-bold">
          {{ item.quantity_avaliable }} Avaliable
        </v-col>
        <v-col>
          <RequestDialog
            :item="item"
            @fetched-user-data="handleVerifyUser"
            @chosen-quantity="handleUpdateQuantity"
            @comments="handleUpdateComments"
            @size="handleUpdateSize"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <VerifyUser
    :dialog="verifyDialog ? true : null"
    :user="fetchedUser"
    @cancel="verifyDialog = false"
    @verified="handleRequest"
  />
  <NoUser :dialog="noUserDialog" @close="noUserDialog = false" />
  <v-snackbar v-model="snackbar" :timeout="3000">
    Your gear request is confirmed!
  </v-snackbar>
</template>
<script setup>
import { defineProps, ref } from "vue";
import RequestDialog from "./RequestDialog.vue";
import VerifyUser from "../SharedComponents/VerifyUser.vue";
import NoUser from "../SharedComponents/NoUser.vue";
import { supabase } from "../../supabase";

const props = defineProps({
  item: {},
});
const emit = defineEmits(["tableChanged"]);
const loading = ref(false);
const verifyDialog = ref(false);
const fetchedUser = ref({});
const noUserDialog = ref(false);
const chosenQuantity = ref(null);
const userComments = ref("");
const userSize = ref("");
const snackbar = ref(false);

const handleUpdateQuantity = (quantity) => {
  chosenQuantity.value = quantity;
  console.log(chosenQuantity.value);
};

const handleUpdateSize = (size) => {
  userSize.value = size;
  console.log(userSize.value);
};
const handleUpdateComments = (comments) => {
  userComments.value = comments;
  console.log(userComments.value);
};
const handleVerifyUser = (user) => {
  if (!user) {
    noUserDialog.value = true;
  } else {
    fetchedUser.value = user;
    console.log(fetchedUser.value);
    verifyDialog.value = true;
  }
};

const sendEmail = async () => {
  const query = supabase.functions.invoke("send-confirmation-email", {
    body: {
      to: `${fetchedUser.value.email}`,
      subject: `UCoc Gear Request Confirmation`,
      body: `Thanks ${fetchedUser.value.first_name}, Your request for ${chosenQuantity.value} ${props.item.name} is confirmed! Show this email to an officer at our next meeting to get your gear! `,
    },
  });
  const { data, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
};

const handleRequest = async () => {
  verifyDialog.value = false;
  loading.value = true;

  const { data, error } = await supabase.from("gear_requests").insert([
    {
      name: `${fetchedUser.value.first_name} ${fetchedUser.value.last_name}`,
      email: fetchedUser.value.email,
      quantity: chosenQuantity.value,
      comments: userComments.value,
      gear_item: props.item.name,
      size: userSize.value,
    },
  ]);
  if (error) {
    console.log(error);
    return false;
  }
  await updateAvaliable();
  emit("tableChanged");
  await sendEmail();
  snackbar.value = true;
  loading.value = false;
};

const updateAvaliable = async () => {
  const { data, error } = await supabase
    .from("gear")
    .update({
      quantity_avaliable: props.item.quantity_avaliable - chosenQuantity.value,
    })
    .eq("id", props.item.id);
  if (error) {
    console.log(error);
    return false;
  }
};
</script>