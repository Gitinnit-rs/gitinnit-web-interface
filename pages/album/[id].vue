<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";

import { Album } from "~/types";

const route = useRoute("album-id");
const id = route.params.id;

const {
    data: album,
    pending,
    error,
} = useFetch<Album[]>(BASE_URL + "/music/album", {
    query: {
        id,
    },
});
console.log(album.value);

useHead({
    title: album.value ? album.value[0].name : id.toString(),
});
</script>

<template>
    <section v-if="pending">Loading...</section>
    <section v-else-if="error">
        <div class="alert alert-error shadow-lg">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="stroke-current flex-shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>
                    An error occurred while fetching album data<br />
                    {{ error || "None" }}
                </span>
            </div>
        </div>
    </section>
    <section v-else-if="album" class="bg-base-200 p-10">
        <div
            class="flex flex-col items-center space-y-5 text-center w-full min-h-screen"
        >
            <img
                :src="album[0].cover_url || FALLBACK_IMAGE_URL"
                alt="album Image"
                class="rounded-lg w-[10rem] h-[10rem] object-cover"
            />
            <div>
                <h1 class="text-4xl font-bold">{{ album[0].name }}</h1>
                <p class="mt-2 text-gray-500">
                    {{ new Date(album[0].release_date).toDateString() }}
                </p>
                
                <div class="mt-8 text-left">
                    <MusicItem v-for="item in album[0].music" :key="item.id" :music="item" />
                </div>
            </div>
        </div>
    </section>
</template>
