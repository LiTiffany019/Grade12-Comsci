import { defineStore } from "pinia";

export const useMovieStore = defineStore("MovieStore", {
  state: () => ({
    id: "",
    poster: "",
  }),
});
