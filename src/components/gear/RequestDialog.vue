<template>
  <v-btn @click="dialog = true" color="rgb(15, 10, 40)">Request This</v-btn>
  <v-dialog v-model="dialog">
    <v-row justify="space-around">
      <v-card width="auto" :loading="loading">
        <template v-slot:loader="{ isActive }">
          <v-dialog v-model="loading">
            <v-container>
              <v-row justify="space-around">
                <v-col class="text-center">
                  <v-progress-circular
                    width="8"
                    size="50"
                    :active="isActive"
                    color="rgb(15, 10, 40)"
                    height="4"
                    indeterminate
                  ></v-progress-circular>
                </v-col>
              </v-row>
            </v-container>
          </v-dialog>
        </template>
        <v-card-title> Request A {{ props.item.name }} </v-card-title>

        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-row class="ma-4">
            <v-col cols="12">
              <v-text-field
                :rules="emailRules"
                v-model="userEmail"
                label="UConn Email"
              ></v-text-field>
              <v-card-text class="text-h5 text-center">Quantity</v-card-text>
              <v-row>
                <v-col cols="12" class="mx-auto">
                  <v-row class="ma-1" align="center" justify="space-between">
                    <v-col cols="4" class="px-0">
                      <v-btn
                        height="2rem"
                        class="mx-auto pa-0"
                        color="rgb(15, 10, 40)"
                        @click.prevent="decrease"
                        >-</v-btn
                      >
                    </v-col>
                    <v-col cols="4" class="px-0">
                      <p class="text-body-1 text-grey text-center pa-0 mx-auto">
                        {{ selectedQuantity }}
                      </p>
                    </v-col>
                    <v-col cols="4" class="px-0">
                      <v-btn
                        height="2rem"
                        class="mx-auto pa-0"
                        color="rgb(15, 10, 40)"
                        @click.prevent="checkQuantity"
                        >+</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-radio-group
                v-model="userSize"
                :rules="radioRules"
                v-if="!!item.sizes"
                inline
                label="Size"
                class="ma-2"
              >
                <v-radio
                  v-for="size in item.sizes"
                  :key="size"
                  :label="size"
                  :value="size"
                ></v-radio>
              </v-radio-group>
              <v-textarea
                label="Any additional Questions?"
                v-model="userQuestions"
              ></v-textarea>
            </v-col>
          </v-row> </v-form
        ><v-card-actions>
          <v-btn @click="dialog = false">Close</v-btn>
          <v-btn @click.prevent="handleSubmit">Submit Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-dialog>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { supabase } from "../../supabase";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();
const dialog = ref(false);
const loading = ref(false);
const userEmail = ref("");
const userSize = ref("");
const userQuestions = ref("");
const form = ref(null);
const valid = ref(false);
const fetchedUser = ref({});
const radioRules = ref([(v) => !!v || "Please Select a Size"]);
const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /[a-zA-Z0-9]+@uconn\.edu/.test(v) || "Must be a valid UConn email",
]);
const selectedQuantity = ref(1);

const props = defineProps({
  item: {},
});

const emit = defineEmits([
  "fetchedUserData",
  "chosenQuantity",
  "comments",
  "size",
]);

const checkQuantity = () => {
  if (selectedQuantity.value + 1 <= props.item.quantity_avaliable) {
    selectedQuantity.value++;
    return true;
  } else return false;
};
const decrease = () => {
  if (selectedQuantity.value > 1) {
    selectedQuantity.value--;
    return true;
  } else return false;
};
const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("email", userEmail.value);
    if (error) {
      console.log(error);
      return false;
    }
    if (data) {
      fetchedUser.value = data[0];
    }
    loading.value = false;
    dialog.value = false;
    emit("fetchedUserData", fetchedUser.value);
    emit("chosenQuantity", selectedQuantity.value);
    emit("comments", userQuestions.value);
    emit("size", userSize.value);
  }
};
</script>