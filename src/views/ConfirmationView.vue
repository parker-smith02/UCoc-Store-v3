<template>
  <div class="my-8"></div>
  <v-card class="text-center" rounded="0">
    <v-card-title>Thank you {{ firstName }} !</v-card-title>
    <v-card-text class="text-body-1">Order Number: {{ order.id }}</v-card-text>
    <v-card color="black text-center my-4">
      <v-card-text>
        Come pick up your order at any of our meetings Wednesdays at 9:00pm in
        TLS 154. Just show us your confirmation email after the meeting.
      </v-card-text>
    </v-card>
    <v-divider class="ma-4"></v-divider>

    <template v-if="!mobile">
      <v-table>
        <thead>
          <tr>
            <th class="text-left"></th>
            <th class="text-left">Name</th>
            <th class="text-left">Size</th>
            <th class="text-left">Color</th>
            <th class="text-left">Price</th>
            <th class="text-left">Quantity</th>
            <th class="text-left">SubTotal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item">
            <CartRow :cart-item="item" :confirm="true" />
          </tr>
        </tbody>
      </v-table>
      <v-divider></v-divider>
    </template>
    <template v-else>
      <v-main class="ma-4">
        <MobileCard
          class="ma-4"
          v-for="item in order.items"
          :key="item"
          :cart-item="item"
          :confirm="true"
        />
      </v-main>
    </template>
  </v-card>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { useCartStore, useOrdersStore } from "../stores/primary";
import CartRow from "../components/cart/CartRow.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import MobileCard from "../components/cart/MobileCard.vue";
import { supabase } from "../supabase";

const orderStore = useOrdersStore();
const cartStore = useCartStore();
const order = ref({});
const firstName = ref("");
const { mobile } = useDisplay();
const actionCount = ref(0);

onMounted(() => {
  actionCount.value = 0;
  if (orderStore.orders.length > 0) {
    order.value = orderStore.orders[0];
    firstName.value = order.value.name.split(" ")[0];
    handleOrderUpload();
    sendEmail();
  }
});
watch(actionCount, (newActionCount, oldActionCount) => {
  if (newActionCount === 2) {
    orderStore.reset();
    cartStore.reset();
  }
});

const sendEmail = async () => {
  const query = supabase.functions.invoke("send-confirmation-email", {
    body: {
      to: `${order.value.email}`,
      subject: `UCoc Merch order ${order.value.id}`,
      body: `Thanks ${firstName.value}, your order is confirmed, show this email to an officer at one of our meetings to pick up your stuff. If you have any questions, email uconnoutingclub@gmail.com`,
    },
  });
  actionCount.value++;
};

const handleOrderUpload = async () => {
  const query = supabase.from("orders").insert({
    id: order.value.id,
    name: order.value.name,
    email: order.value.email,
    items: cartStore.items,
    price: cartStore.cartTotal,
    type: "merch",
  });
  const { error } = await query;
  if (error) {
    console.log(error);
    actionCount.value++;
    return false;
  }
  actionCount.value++;
};
</script>