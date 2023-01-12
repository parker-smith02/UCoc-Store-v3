import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      snackbar: false,
      items: useStorage("items", []),
      cartSize: useStorage("cartSize", 0),
    };
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
      this.products = [...merchData];
      this.dataRetrieved = true;
    },
  },
});
