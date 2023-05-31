import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [],
    cart: [],
  }),
  
  actions: {
    addToCart(poster, title) {
      this.cart.push({
        poster,
        title,
      });
      console.log(this.cart);
    }
  }
})