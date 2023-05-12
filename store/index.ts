import { defineStore } from "pinia";
import { Music } from "~/types";

export const useStore = defineStore("app", {
    state: () => ({
        activeMusic: null as Music | null,
    }),
    actions: {},
});
