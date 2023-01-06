<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Add trip </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Trip</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Title"
                  required
                  v-model="formTitle"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Number of Spots"
                  v-model="formSpots"
                  hint="EX: sm, m, l"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Location"
                  v-model="formLocation"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="formDesc"
                  required
                >
                </v-textarea>
              </v-col>
              <v-col cols="8" sm="6" md="4">
                <v-radio-group
                  inline
                  label="Activity Level"
                  mandatory
                  v-model="formActivityLevel"
                >
                  <v-radio label="Beginner" value="beginner"> </v-radio>
                  <v-radio label="Moderate" value="moderate"></v-radio>
                  <v-radio label="Advanced" value="advanced"></v-radio>
                  <v-radio label="Extreme" value="extreme"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="8" sm="6" md="4">
                <v-text-field
                label="Number of Spots"
                v-model="formSpots"></v-text-field>
              </v-col>
              <v-col cols="8" sm="6" md="4">
                <v-text-field
                type="date"
                label="Date"
                required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="handleFormSubmit">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
  <script setup>
import { ref } from "vue";
import { supabase } from "../../supabase";

const emit = defineEmits(["formSubmit"]);

const dialog = ref(false);
const formTitle = ref("");
const formDesc = ref("");
const formActivityLevel = ref("");
const formLocation = ref("");
const formSpots = ref(0);

const handleFormSubmit = async () => {
  dialog.value = false;
  const sizeArr = formatArray(formSizes.value);
  const colorArr = formatArray(formColors.value);
  const query = supabase.from("merch").insert([
    {
      name: formName.value,
      description: formDesc.value,
      sizes: sizeArr,
      quantity: formQuantity.value,
      colors: colorArr,
    },
  ]);
  const { data, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  console.log(data);
  emit("formSubmit");
};

const formatArray = (formData) => {
  const arr = formData.split(",");
  console.log(arr);
  return arr;
};
</script>