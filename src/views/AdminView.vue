<template>
  <AdminNav />
  <v-row>
    <main>
      <v-card class="ma-8 pa-4">
        <v-card-title>Site Admin Page</v-card-title>
        <v-card-text
          >This is where officers can manipulate the content of the site. There
          is a table for each different feature of the site that shows the
          current site content for each section. In each of these tables,
          content can be added or removed to update products/make trips. When
          adding new content, any field that takes multiple values (sizes,
          colors) should be entered like so: S, M, L, XL</v-card-text
        >
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
    </main>
  </v-row>
</template>
<script setup>
import { onMounted } from "@vue/runtime-core";
import { supabase } from "../supabase";
import { ref } from "@vue/runtime-core";
import AdminProductTable from "../components/admin/AdminProductTable.vue";
import AdminNav from "../components/admin/AdminNav.vue";
import GroupOrderTable from "../components/admin/GroupOrderTable.vue";
import MemberTable from "../components/admin/MemberTable.vue";

const merchItems = ref({});
const groupOrderItems = ref({});
const productTableKey = ref(0);
const groupOrderTableKey = ref(0);
const members = ref([]);
const memberTableKey = ref(0);

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

onMounted(() => {
  fetchMerch();
  fetchGroupOrders();
  fetchMembers();
});

const updateMerchTable = () => {
  fetchMerch();
};

const updateGroupOrderTable = () => {
  fetchGroupOrders();
};
</script>
