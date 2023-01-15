import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      snackbar: false,
      items: useStorage("items", []),
      cartSize: useStorage("cartSize", 0),
      cartTotal: useStorage("cartTotal", 0),
    };
  },
  actions: {
    removeItem(name) {
      const item = this.items.find((product) => product.name == name);
      this.items.splice(item, 1);
      this.cartSize -= item.quantity;
    },
    reset() {
      this.items.value = [];
      this.items = [];
      this.cartSize = 0;
      this.cartTotal = 0;
    },
  },
});

export const useOrdersStore = defineStore("orders", {
  state: () => {
    return {
      orders: useStorage("orders", []),
    };
  },
  getters: {},
  actions: {
    reset() {
      this.orders = [];
      this.orders.value = null;
    },
  },
});

export const useMerchStore = defineStore("merch", {
  state: () => {
    return {
      dataRetrieved: false,
      products: useStorage("products", []),
    };
  },
  getters: {
    getProducts: (state) => {
      return state.products;
    },
    getProductByName: (state) => {
      return (name) => state.products.find((product) => product.name === name);
    },
    getProductById: (state) => {
      return (id) => state.products.find((product) => product.api_id === id);
    },
  },
  actions: {
    async fetchMerch() {
      const { data: merchData, error: merchError } = await supabase
        .from("merch")
        .select("*");
      if (merchError) {
        console.log(merchError);
        return false;
      }
      this.products.value = null;
      this.products = [...merchData];
      this.dataRetrieved = true;
    },
  },
});
