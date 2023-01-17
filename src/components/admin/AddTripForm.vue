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
              <v-col cols="6">
                <v-textarea label="Description" v-model="formDesc" required>
                </v-textarea>
              </v-col>
              <v-col cols="6">
                <v-textarea
                  label="Things To Bring"
                  v-model="formItems"
                  hint="Ex: water, food, warm clothes"
                ></v-textarea>
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
                <v-file-input
                  v-model="formImageArr"
                  label="Upload Images"
                  variant="filled"
                  prepend-icon="mdi-camera"
                  multiple
                ></v-file-input>
              </v-col>
              <v-col cols="8" sm="6" md="4">
                <v-text-field
                  v-model="formStartDate"
                  type="date"
                  label="Start Date"
                  required
                ></v-text-field>
              </v-col>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="formPrice"
                    label="Price"
                    hint="Leave blank if trip is free"
                  >
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="formApiId"
                    label="Stripe Api Id"
                    hint="Leave Blank if Trip is
                Free"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="formEndDate"
                    type="date"
                    label="End Date"
                    hint="Use same date if daytrip"
                  ></v-text-field>
                </v-col>
              </v-row>
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
const formSpots = ref();
const formImageArr = ref();
const formItems = ref("");
const formStartDate = ref("");
const formEndDate = ref("");
const formPrice = ref();
const formApiId = ref("");
let imgUrls = [];

const uploadData = async () => {
  const itemArr = formatArray(formItems.value);
  console.log(formEndDate.value);
  const query = supabase.from("trips").insert([
    {
      title: formTitle.value,
      description: formDesc.value,
      start_date: formStartDate.value,
      end_date: formEndDate.value ? formEndDate.value : null,
      activity_level: formActivityLevel.value,
      things_to_bring: itemArr,
      number_of_spots: formSpots.value,
      number_of_signups: 0,
      location: formLocation.value,
      price: formPrice.value,
      api_id: formApiId.value,
      img_urls: imgUrls,
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

const handleFormSubmit = async () => {
  dialog.value = false;
  handleImageUpload();
  setTimeout(() => {
    uploadData();
  }, 7000);
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
        .upload(`./trips/${formTitle.value}/${filePath}`, image);
      if (uploadError) {
        console.log(error);
        return false;
      }
      const { data: publicUrl, error } = supabase.storage
        .from("images")
        .getPublicUrl(`trips/${formTitle.value}/${filePath}`);
      if (error) {
        console.log(error);
      }
      imgUrls.push(publicUrl.publicUrl);
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