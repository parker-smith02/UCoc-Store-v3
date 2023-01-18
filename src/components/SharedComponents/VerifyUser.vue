<template>
  <v-dialog v-model="props.dialog">
    <v-row justify="space-around">
      <v-card width="auto">
        <v-card-title> Is This You? </v-card-title>
        <v-divider></v-divider>
        <v-row justify="space-around" class="ma-2">
          <v-card-text class="text-body-1"
            >First Name:
            <span class="text-green">{{ user.first_name }}</span></v-card-text
          >
          <v-card-text class="text-body-1"
            >Last Name:
            <span class="text-green">{{ user.last_name }}</span></v-card-text
          >
        </v-row>
        <v-row justify="space-around" class="ma-2">
          <v-card-text class="text-body-1"
            >Email:
            <span class="text-green">{{ user.email }}</span>
          </v-card-text>
          <v-card-text
            :class="
              user.dues ? 'text-body-1 text-green' : 'text-body-1 text-red'
            "
          >
            <v-icon
              class="mx-2"
              :icon="user.dues ? 'mdi-check-outline' : 'mdi-alert-box-outline'"
            ></v-icon
            >{{
              user.dues ? "Dues Have Been Paid" : "Dues Have Not Been Paid"
            }}</v-card-text
          >
        </v-row>

        <v-card-text class="text-body-1"
          >Phone Number:
          <span :class="user.phone_number ? 'text-green' : 'text-yellow'">
            {{
              user.phone_number
                ? user.phone_number
                : user.dues
                ? `None on file, Please Enter Below`
                : `None on File`
            }}
          </span>
        </v-card-text>
        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            :rules="rules"
            class="ma-4"
            v-model="phoneNumber"
            v-if="!user.phone_number && user.dues"
            label="Please Enter Your Phone Number"
            hint="Phone numbers will not be shared with anyone. Phone numbers are used in the event we need to contact you regarding gear or a trip."
          ></v-text-field>
          <v-card-actions v-if="user.dues">
            <v-btn color="green" @click.prevent="handleSubmit">Yes</v-btn>
            <v-btn color="red" @click.prevent="$emit('cancel')">No</v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn
              v-if="!mobile"
              color="red"
              height="auto"
              width="100%"
              @click.prevent="router.push('/how')"
            >
              Yearly dues must be paid. Visit how to join page for more details
            </v-btn>
            <v-btn
              v-else
              color="red"
              height="auto"
              width="100%"
              @click.prevent="router.push('/how')"
            >
              <p class="px-1">Dues much be paid.</p>
              <p>Click here for details</p>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-dialog>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { supabase } from "../../supabase";

const emit = defineEmits(["cancel", "verified"]);
const router = useRouter();
const phoneNumber = ref(null);
const valid = ref(false);
const form = ref(null);
const rules = ref([
  (v) => (v && v.length === 10) || "Please enter a valid phone number",
  (v) => !!v || "Please enter your phone number",
]);
const { mobile } = useDisplay();
const props = defineProps({
  user: {},
  dialog: false,
});

const handleSubmit = async () => {
  console.log("submit");

  const { valid } = await form.value.validate();
  if (valid) {
    if (!props.user.phone_number) {
      console.log("sending phone number");
      const { data: phoneData, error: phoneError } = await supabase
        .from("members")
        .update({ phone_number: phoneNumber.value })
        .eq("id", props.user.id);
      if (phoneError) {
        console.log("ERROR", phoneError);
        return false;
      }
    }
    emit("verified");
  }
};
</script>