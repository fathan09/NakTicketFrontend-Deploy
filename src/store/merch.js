import { defineStore } from "pinia";

export const useMerchStore = defineStore("merchstore", {
  state: () => ({
    merchItems: []
  }),

  getters: {
    totalQuantity(state) {
      return state.merchItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice(state) {
      return state.merchItems.reduce((total, item) => total + (item.quantity * item.price), 0);
    }
  },

  actions: {
    addToCart(merch) {
      const existingItem = this.merchItems.find(
        (item) => item.name === merch.name
      );

      if (existingItem) {
        existingItem.quantity += merch.quantity || 1;
      } else {
        this.merchItems.push({ ...merch, quantity: merch.quantity || 1 });
      }
    },

    reduceFromCart(merch) {
      const existingItem = this.merchItems.find(
        (item) => item.name === merch.name
      );

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          this.merchItems = this.merchItems.filter(
            (item) => item.name !== merch.name
          );
        }
      }
    },

    clearCart() {
      this.merchItems = [];
    }
  }
});
