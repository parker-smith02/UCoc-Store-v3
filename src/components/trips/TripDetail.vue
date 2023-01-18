<template>
  <v-card class="pa-8" height="auto">
    <v-row>
      <v-col :cols="mobile ? 12 : 6">
        <v-carousel height="32rem" :key="carouselKey">
          <v-carousel-item
            v-for="image in trip.img_urls"
            :key="image"
            :src="image"
          ></v-carousel-item
        ></v-carousel>
      </v-col>
      <v-col :cols="mobile ? 12 : 6">
        <v-card-title v-if="!mobile" class="text-h2 pa-6">{{
          trip.title
        }}</v-card-title>
        <v-card-title v-else class="pa-6 text-h5"
          >{{ trip.title }}
        </v-card-title>
        <v-row>
          <v-col :class="mobile ? `ma-2` : null">
            <v-card-text class="text-h5 my-8 text-grey">{{
              !!trip.price ? `$${trip.price}` : `Free`
            }}</v-card-text>
          </v-col>
          <v-col class="my-auto">
            <v-chip :color="calculateColor()">
              {{ trip.activity_level }}
            </v-chip>
          </v-col>
          <v-col>
            <v-card-text class="my-8 text-body-1">
              <v-icon icon="mdi-map-marker" class="mx-2" />{{
                trip.location
              }}</v-card-text
            >
          </v-col>
        </v-row>
        <v-card-text class="text-body-1 text-grey">{{
          trip.description
        }}</v-card-text>
        <v-divider></v-divider>
        <v-row class="mx-0 my-1">
          <v-card-text class="text-body-1 text-grey"
            >{{ avaliableSpots }} spots left</v-card-text
          >
          <v-card-text class="text-body-1 text-grey">{{
            startDate === endDate ? startDate : `${startDate} - ${endDate}`
          }}</v-card-text>
        </v-row>
        <v-row>
          <v-col :cols="mobile ? 12 : 6">
            <v-list density="compact">
              <v-list-subheader>Things to Bring</v-list-subheader>
              <v-list-item v-for="item in trip.things_to_bring" :key="item">{{
                item
              }}</v-list-item>
            </v-list>
          </v-col>
          <v-col class="ma-auto">
            <v-card class="my-4 pa-2 text-body-1" color="black">
              Some trips require extra forms/imformation. Be sure to frequently
              check your email to ensure that you dont miss any important info
            </v-card>
            <v-form ref="form">
              <v-text-field
                v-model="userEmail"
                :rules="emailRules"
                label="UConn Email"
              ></v-text-field>
            </v-form>
            <v-btn color="rgb(15, 10, 40)" @click.prevent="handleSubmit">
              Sign Up
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
  <VerifyUser
    :dialog="verifyDialog ? true : null"
    :user="fetchedUser"
    @cancel="verifyDialog = false"
    @verified="handleRequest"
  />
  <NoUser :dialog="noUserDialog" @close="noUserDialog = false" />
  <v-dialog v-model="confirmationDialog">
    <v-card width="auto">
      <v-card-title>Success!</v-card-title>
      <v-card-text
        >You have successfully signed up for {{ trip.title }}. Make sure to
        check your email so that you dont miss any additional information
        regarding the trip!</v-card-text
      >
      <v-card-actions>
        <v-btn @click.prevent="router.push(`/`)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useTripStore } from "../../stores/primary";
import { supabase } from "../../supabase";
import VerifyUser from "../SharedComponents/VerifyUser.vue";
import NoUser from "../SharedComponents/NoUser.vue";
import { loadStripe } from "@stripe/stripe-js";

const tripStore = useTripStore();
const loading = ref(false);
const { mobile } = useDisplay();
const route = useRoute();
const router = useRouter();
const trip = ref({});
const startDate = ref("");
const endDate = ref("");
const fetchTrip = tripStore.getTripById;
const carouselKey = ref(0);
const avaliableSpots = ref();
const form = ref(null);
const valid = ref(false);
const fetchedUser = ref({});
const userEmail = ref("");
const verifyDialog = ref(false);
const noUserDialog = ref(false);
const confirmationDialog = ref(false);
const emailRules = ref([
  (v) => !!v || "E-mail is required",
  (v) => /[a-zA-Z0-9]+@uconn\.edu/.test(v) || "Must be a valid UConn email",
]);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

onMounted(() => {
  trip.value = fetchTrip(route.params.id);
  carouselKey.value++;
  avaliableSpots.value =
    trip.value.number_of_spots - trip.value.number_of_signups;
  startDate.value = formatDate(trip.value.start_date);
  endDate.value = formatDate(trip.value.end_date);
});

const formatDate = (date) => {
  const dateArr = date.split("-");
  return `${dateArr[1]}/${dateArr[2]}`;
};

const calculateColor = () => {
  if (trip.value.activity_level === "beginner") return `green`;
  if (trip.value.activity_level === "moderate") return `yellow`;
  if (trip.value.activity_level === "advanced") return `orang`;
  if (trip.value.activity_level === "extreme") return `red`;
};

const fetchUser = async () => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("email", userEmail.value);
  if (error) {
    console.log(error);
    return false;
  }
  console.log(data);
  fetchedUser.value = data[0];
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

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    loading.value = true;
    await fetchUser();
    handleVerifyUser(fetchedUser.value);
    loading.value = false;
  }
};

const checkForDuplicate = async () => {
  const { data, error } = await supabase
    .from("trip_signups")
    .select("*")
    .eq("trip", route.params.id)
    .eq("member", fetchedUser.value.id);
  if (error) {
    console.log(error);
    return false;
  }
  if (data.length === 0) {
    console.log("no dub");
    return false;
  } else return true;
};

const handleRequest = async () => {
  loading.value = true;
  console.log("REQUEST");
  verifyDialog.value = false;
  const { data, error } = await supabase
    .from("trip_signups")
    .insert([{ member: fetchedUser.value.id, trip: route.params.id }]);
  if (error) {
    console.log(error);
    return false;
  }
  await updateAvaliable();
  await sendEmail();
  if (trip.value.price > 0) handleCheckout();
  else confirmationDialog.value = true;
};

const updateAvaliable = async () => {
  const { data, error } = await supabase
    .from("trips")
    .update({
      number_of_signups: trip.value.number_of_signups++,
    })
    .eq("id", trip.value.id);
  if (error) {
    console.log(error);
    return false;
  }
};

const sendEmail = async () => {
  const query = supabase.functions.invoke("send-confirmation-email", {
    body: {
      to: `${fetchedUser.value.email}`,
      subject: `UCoc Trip Sign up Confirmation`,
      body: `Thanks ${fetchedUser.value.first_name}, Your signup for ${trip.value.name} has been confirmed. Please make sure to check your email in case we need more information from you. `,
    },
  });
  const { data, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
};

const handleCheckout = async () => {
  const stripe = await stripePromise;
  const itemsArr = [{ price: trip.value.api_id, quantity: 1 }];
  const { error } = await stripe.redirectToCheckout({
    lineItems: itemsArr,
    mode: "payment",
    cancelUrl: window.location.origin,
    successUrl: `${window.location.origin}`,
  });

  if (error) {
    console.log(error);
    loading.value = false;
    return false;
  }
  handleRequest();
};
</script>