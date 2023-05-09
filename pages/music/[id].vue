<script lang="ts" setup>
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { Music } from "~/types";

const route = useRoute();
const id = route.params.id;
// d5fe314a-6ae5-448e-a21c-2b350a387ad3

const { data: music, pending } = useFetch<Music[]>(BASE_URL + "/music", {
    query: {
        id,
    },
});

useHead({
    title: music.value ? music.value[0].name : id.toString(),
});
</script>

<template>
    <section v-if="pending">Loading...</section>
    <section v-else-if="music" class="bg-base-200 p-10">
        <div class="flex items-center justify-center space-x-8">
            <img
                :src="music[0].cover_url || FALLBACK_IMAGE_URL"
                alt="Music Image"
                class="rounded-lg w-[10rem] h-[10rem] object-cover"
            />
            <div>
                <h1 class="text-4xl font-bold">{{ music[0].name }}</h1>
                <p class="mt-1">
                    <span
                        v-for="(artist, i) in music[0].artists"
                        :key="artist.id"
                    >
                        <NuxtLink
                            :to="'/user/' + artist.username"
                            class="hover:text-pink-600 cursor-pointer transition"
                            >{{ artist.name }}</NuxtLink
                        ><span v-if="i !== music[0].artists.length - 1"
                            >,
                        </span></span
                    >
                </p>
            </div>
        </div>
    </section>
</template>
