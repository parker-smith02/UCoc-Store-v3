<template>
  <div class="admin">
    <v-main class="justify-center">
      <v-spacer class="mb-32" />
      <v-card class="ma-8 pa-4">
        <v-card-title>Site Admin Page</v-card-title>
        <v-card-text
          >This is where officers can manipulate the content of the site. There
          is a table for each different feature of the site that shows the
          current site content for each section. In each of these tables,
          content can be added or removed to update products/make trips. When
          adding new content, any field that takes multiple values (sizes,
          colors) should be entered like so: S, M, L, XL.</v-card-text
        >
        <v-card-text
          >When adding any product with payments involved (merch, group orders)
          the product must also be added to stripe
          https://dashboard.stripe.com/dashboard.</v-card-text
        >
        <v-row class="pa-4">
          <v-btn class="mx-4" color="primary" @click="handleSignOut"
            >Sign Out</v-btn
          >
          <v-btn class="mx-4" color="primary">Add New Admin User</v-btn>
        </v-row>
      </v-card>
      <AdminProductTable
        :items="merchItems"
        :key="productTableKey"
        @table-updated="updateMerchTable"
      />
      <GroupOrderTable
        :items="groupOrderItems"
        :key="groupOrderTableKey"
        @table-updated="updateGroupOrderTable"
      />
      <MemberTable :members="members" :key="memberTableKey" />
      <TripsTable
        :trips="trips"
        :key="tripTableKey"
        @table-updated="updateTripsTable"
      />
    </v-main>
  </div>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { supabase } from "../supabase";
import { ref } from "@vue/runtime-core";
import AdminProductTable from "../components/admin/AdminProductTable.vue";
import AdminNav from "../components/admin/AdminNav.vue";
import GroupOrderTable from "../components/admin/GroupOrderTable.vue";
import MemberTable from "../components/admin/MemberTable.vue";
import TripsTable from "../components/admin/TripsTable.vue";
import router from "../router";

const merchItems = ref({});
const groupOrderItems = ref({});
const productTableKey = ref(0);
const groupOrderTableKey = ref(0);
const members = ref([]);
const memberTableKey = ref(0);
const trips = ref({});
const tripTableKey = ref(0);
const loading = ref(false);

const fetchMerch = async () => {
  const query = supabase.from("merch").select("*");
  let { data: merch, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  merchItems.value = merch;
  productTableKey.value++;
};

const fetchGroupOrders = async () => {
  const query = supabase.from("group_orders").select("*");
  const { data: group_orders, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  groupOrderItems.value = group_orders;
  groupOrderTableKey.value++;
};

const fetchMembers = async () => {
  const query = supabase
    .from("members")
    .select("first_name, last_name, email, dues");
  const { data: memberdata, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  members.value = memberdata;
  memberTableKey.value++;
};

const fetchTrips = async () => {
  const query = supabase.from("trips").select("*");
  const { data: tripData, error } = await query;
  if (error) {
    console.log(error);
    return false;
  }
  trips.value = tripData;
  tripTableKey.value++;
};

onMounted(() => {
  loading.value = true;
  fetchMerch();
  fetchGroupOrders();
  fetchMembers();
  fetchTrips();
  loading.value = false;
});

const updateMerchTable = () => {
  fetchMerch();
};

const updateGroupOrderTable = () => {
  fetchGroupOrders();
};

const updateTripsTable = () => {
  fetchTrips();
};

const handleSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  router.push("/");
};
</script>
