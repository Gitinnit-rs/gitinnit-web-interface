import Toast, { POSITION, PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options: PluginOptions = {
    position: POSITION.BOTTOM_RIGHT,
    transition: "Vue-Toastification__fade",
};

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Toast, options);
});
