import { defineStore } from "pinia";

interface IUserStore {
    user: any;
}

export const useUserStore = defineStore("user", {
    state: (): IUserStore => ({
        user: {},
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        updateAccessToken(access_token: string) {
            if (this.user) {
                this.user.access_token = access_token;
            }
        },
        updateUserId(userId: string) {
            if (this.user) {
                this.user.id = userId;
            }
        },
    },
    persist: {
        storage: persistedState.localStorage,
    },
});
