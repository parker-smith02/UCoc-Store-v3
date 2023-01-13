<template>
  <v-main class="ma-4">
    <v-card class="pa-8" height="auto">
      <v-row>
        <v-col>
          <v-carousel height="32rem" :key="carouselKey">
            <v-carousel-item
              v-for="image in product.img_urls"
              :key="image"
              :src="image"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col>
          <v-card-title v-if="!mobile" class="text-h2 pa-6">{{
            product.name
          }}</v-card-title>
          <v-card-title v-else class="text-h3 pa-6">{{
            product.name
          }}</v-card-title>
          <v-card-text class="text-h5 my-8 text-grey"
            >${{ product.price }}</v-card-text
          >
          <v-card-text class="text-body-1 text-grey">{{
            product.description
          }}</v-card-text>
          <v-divider></v-divider>
          <v-row>
            <v-col>
              <v-form ref="form" v-model="valid">
                <v-card-text class="text-h5">Color</v-card-text>
                <template v-if="colorLen > 1">
                  <v-radio-group
                    class="mx-4"
                    inline
                    v-model="selectedColor"
                    :rules="[(v) => !!v || 'Required']"
                  >
                    <v-radio
                      color="rgb(132, 50, 121)"
                      v-for="color in product.colors"
                      :key="color"
                      :label="color"
                      :value="color"
                    ></v-radio>
                  </v-radio-group>
                </template>
                <template v-if="colorLen <= 1">
                  <v-card-text
                    class="text-grey text-body-1"
                    v-for="color in product.colors"
                    :key="color"
                    >{{ color }}</v-card-text
                  >
                </template>
                <v-card-text class="text-h5">Size</v-card-text>
                <template v-if="sizeLen > 1">
                  <v-radio-group
                    v-if="sizeLen > 1"
                    class="mx-4"
                    inline
                    v-model="selectedSize"
                    :rules="[(v) => !!v || 'Required']"
                  >
                    <v-radio
                      color="rgb(132, 50, 121)"
                      v-for="size in product.sizes"
                      :key="size"
                      :label="size"
                      :value="size"
                    ></v-radio>
                  </v-radio-group>
                </template>
                <template v-if="sizeLen <= 1">
                  <v-card-text
                    class="text-grey text-body-1"
                    v-for="size in product.sizes"
                    :key="size"
                  >
                    {{ size }}
                  </v-card-text>
                </template>
                <v-card-text class="text-h5">Quantity</v-card-text>
                <v-row class="ma-2" align="center">
                  <v-btn
                    height="2rem"
                    class="mx-4"
                    color="rgb(15, 10, 40)"
                    @click="decrease"
                    >-</v-btn
                  >
                  <p class="text-body-1 text-grey">{{ selectedQuantity }}</p>
                  <v-btn
                    height="2rem"
                    class="mx-4"
                    color="rgb(15, 10, 40)"
                    @click="selectedQuantity++"
                    >+</v-btn
                  >
                </v-row>
              </v-form>
            </v-col>
            <v-col class="ma-4">
              <v-card color="black" class="my-4">
                <v-card-text class="text-grey"
                  >All Purchased merch can be picked up at any of our club
                  meetings, Wednesdays at 9:00 PM in TLS 154. Unfortunately we
                  cannot ship items.</v-card-text
                >
              </v-card>
              <v-divider></v-divider>
              <v-btn
                class="my-4"
                color="rgb(15, 10, 40)"
                @click="handleAddToCart"
                >Add to Cart</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>
<script setup>
import { onMounted, ref } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useCartStore, useMerchStore } from "../stores/primary";

const { mobile } = useDisplay();
const route = useRoute();
const router = useRouter();
const merchStore = useMerchStore();
const cartStore = useCartStore();
const carouselKey = ref(0);
const product = ref({});
const fetchProduct = merchStore.getProductByName;
const selectedSize = ref("");
const selectedColor = ref("");
const selectedQuantity = ref(1);
const valid = ref(false);
const sizeLen = ref(0);
const colorLen = ref(0);

const form = ref(null);

onMounted(() => {
  product.value = fetchProduct(route.params.name);
  carouselKey.value++;
  sizeLen.value = product.value.sizes.length;
  colorLen.value = product.value.colors.length;
  colorLen.value <= 1 ? (selectedColor.value = product.value.colors[0]) : null;
  sizeLen.value <= 1 ? (selectedSize.value = product.value.sizes[0]) : null;
});

const decrease = () => {
  selectedQuantity.value <= 1 ? null : selectedQuantity.value--;
};

const handleAddToCart = async () => {
  const { valid } = await form.value.validate();
  if (valid && product.value.quantity >= 1) {
    console.log("valid");
    cartStore.$patch((state) => {
      state.items.push({
        product: product.value.name,
        quantity: selectedQuantity.value,
        size: selectedSize.value,
        color: selectedColor.value,
      });
      state.cartSize = state.cartSize + selectedQuantity.value;
      state.snackbar = true;
      state.cartTotal += product.value.price * selectedQuantity.value;
    });
    router.push("/");
  }
};
</script>

