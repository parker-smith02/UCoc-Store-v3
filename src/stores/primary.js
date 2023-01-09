import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => {
    return {
      items: [],
      cartSize: 0,
    };
  },
});

export const useMerchStore = defineStore("merch", {
  state: () => {
    return {
      dataRetrieved: false,
      products: [],
    };
  },
  getters: {},
  actions: {
    async fetchMerch() {
      const { data: merchData, error: merchError } = supabase;
    },
  },
});
