<template>
  <v-container>
    <v-row justify="center">
      <v-card width="32rem">
        <v-card-title> Log in to View Admin Panel </v-card-title>
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
          <v-btn color="primary" class="mx-8" @click="handleLogin">Login</v-btn>
          <v-btn @click="handleSignOut">Sign Out</v-btn>
        </v-col>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { supabase } from "../supabase";

const userEmail = ref("");
const userPassword = ref("");
const loading = ref(false);

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userEmail.value,
      password: userPassword.value,
    });
    if (error) {
      console.log(error);
      return false;
    }
  } catch (error) {
    alert(error.error_description || error.message);
  } finally {
    loading.value = false;
  }
};

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
};
</script>