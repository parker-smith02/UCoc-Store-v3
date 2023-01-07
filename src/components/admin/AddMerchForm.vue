<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Add merch </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Merch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Name"
                  required
                  v-model="formName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4"> </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Sizes"
                  v-model="formSizes"
                  hint="EX: sm, m, l"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  label="Description"
                  v-model="formDesc"
                  persistent-hint
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity"
                  required
                  v-model="formQuantity"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Colors"
                  v-model="formColors"
                  hint="EX: blue, red, pruple"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-file-input
                  v-model="formImageArr"
                  label="Upload Images"
                  variant="filled"
                  prepend-icon="mdi-camera"
                  multiple
                ></v-file-input>
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
const formName = ref("");
const formDesc = ref("");
const formSizes = ref("");
const formQuantity = ref(null);
const formColors = ref("");
const formImageArr = ref();

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
  await handleImageUpload();
  emit("formSubmit");
};

const handleImageUpload = async () => {
  const images = formImageArr.value;
  images.forEach(async (image) => {
    try {
      if (!image) {
        throw new Error("Select a file to upload");
      }
      const fileExt = image.name.split(".").pop();
      const filePath = `${Math.random()}.${fileExt}`;

      let { error: uploadError } = await supabase.storage
        .from("images")
        .upload(`./merch/${formName.value}/${filePath}`, image);
      if (uploadError) {
        console.log(error);
        return false;
      }
    } catch (error) {
      alert(error.message);
    }
  });
};

const formatArray = (formData) => {
  const arr = formData.split(",");
  console.log(arr);
  return arr;
};
</script>