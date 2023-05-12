<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { useStore } from "~/store";
import { Album } from "~/types";

const store = useStore();
const route = useRoute("album-id");
const id = route.params.id;

const { data: album, pending } = useFetch<Album[]>(BASE_URL + "/music/album", {
    query: {
        id,
    },
});
console.log(album.value);

useHead({
    title: album.value ? album.value[0].name : id.toString(),
});
</script>

<template></template>
