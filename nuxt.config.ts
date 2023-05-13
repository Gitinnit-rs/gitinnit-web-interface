// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
        port: 4000,
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
        "@vue-macros/nuxt",
        "nuxt-typed-router",
        '@vueuse/nuxt',
    ],
    plugins: [{ mode: "client", src: "@/plugins/toast.ts" }],
});
