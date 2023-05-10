// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 4200,
    },
    app: {
        head: {
            title: "App",
        },
    },
    modules: [
        "nuxt-windicss",
        "@pinia/nuxt",
        "@pinia-plugin-persistedstate/nuxt",
        "nuxt-typed-router",
    ],
});
