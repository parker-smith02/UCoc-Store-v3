<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail color="primary">
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
          title="Ucoc"
          subtitle="uconnoutingclub@gmail.com"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="Back to Main Site"
          value="myfiles"
          :to="`/`"
          router
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main style="height: 250px"></v-main>
  </v-layout>
</template>
<script setup>
</script>