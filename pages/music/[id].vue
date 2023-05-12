<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { useStore } from "~/store";
import { Music } from "~/types";

const store = useStore();
const route = useRoute("music-id");
const id = route.params.id;

const {
    data: music,
    pending,
    error,
} = useFetch<Music[]>(BASE_URL + "/music", {
    query: {
        id,
    },
});

watch(music, () => {
    console.log("PATCHING WITH NEW MUSIC");
    if (!pending && music.value && music.value[0]) {
        store.$patch({
            activeMusic: music.value[0],
        });
        console.log("PATCHED");
    }
});

store.$patch({
    activeMusic: music.value ? music.value[0] : {},
});

useHead({
    title: music.value ? music.value[0].name : id.toString(),
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
                    An error occurred while fetching music data<br />
                    {{ error || "None" }}
                </span>
            </div>
        </div>
    </section>
    <section v-else-if="music && music[0]" class="bg-base-200 p-10">
        <div
            class="mt-20 flex flex-col items-center space-y-5 text-center w-full min-h-screen"
        >
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
                            class="text-gray-700 hover:text-pink-600 cursor-pointer transition"
                            >{{ artist.name }}</NuxtLink
                        ><span v-if="i !== music[0].artists.length - 1"
                            >,
                        </span></span
                    >
                </p>
                <div class="mt-2 flex justify-center space-x-1">
                    <span
                        class="badge"
                        v-for="tag in music[0].tags"
                        :key="tag"
                        >{{ tag }}</span
                    >
                </div>
                <div
                    class="mr-5 mt-5 flex items-center justify-evenly space-x-4"
                >
                    <div>
                        <p class="subtitle">Released on</p>
                        <p>
                            {{ new Date(music[0].release_date).toDateString() }}
                        </p>
                    </div>
                    <div>
                        <p class="subtitle">Genre</p>
                        <p class="uppercase">
                            {{
                                music[0].genre[0] || music[0].tags[0] || "Not Set"
                            }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else>No data found</section>
</template>
