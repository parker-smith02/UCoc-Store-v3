<template>
  <v-container>
    <v-row justify="center">
      <v-card width="32rem">
        <v-card-title> Sign Up </v-card-title>
        <v-col class="pa-8">
          <v-row>
            <v-text-field
              v-model="userEmail"
              class="px-12"
              label="Email"
              prepend-inner-icon="mdi-email"
            ></v-text-field>
          </v-row>
          <v-row class="pb-8">
            <v-text-field
              v-model="userPassword"
              class="px-12"
              label="Password"
              prepend-inner-icon="mdi-lock"
            ></v-text-field>
          </v-row>
          <v-btn color="primary" class="mx-8" @click="handleSignUp"
            >Sign Up</v-btn
          >
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref } from "@vue/runtime-core";
import { supabase } from "../supabase";

const userEmail = ref("");
const userPassword = ref("");

const handleSignUp = async () => {
  try {
    const { error } = await supabase.auth.signUp({
      email: userEmail.value,
      password: userPassword.value,
    });

    if (error) {
      console.log(error);
      return false;
    }
  } catch (error) {
    alert(error.error_description || error.message);
  }
};
</script>