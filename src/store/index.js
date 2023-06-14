import { defineStore } from "pinia";
import { firestore } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

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

      await setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },

    async rmFromCart(index) {
      this.cart.splice(index, 1);
      await setDoc(doc(firestore, "carts", this.user.email), {
        cart: this.cart,
      });
    },
  },
});
