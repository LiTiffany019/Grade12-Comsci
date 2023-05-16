import { defineStore } from "pinia";

export const useMovieStore = defineStore ('movies', {
    state: () => ({
        movieTitle: "figure it out later"
    })
});