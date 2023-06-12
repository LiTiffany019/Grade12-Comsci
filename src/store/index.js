import { defineStore } from "pinia";

export const useMovieStore = defineStore("store", {
  state: () => ({
    user: null,
    cart: [],
  }),
  actions: {
    async addToCart(poster, title) {
      this.cart.push({
        poster,
        title,
      });

      await setDoc(doc(firestore, "carts", this.user.email), { cart: this.cart });
    }
  }
})