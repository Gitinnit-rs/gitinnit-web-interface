<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { useStore } from "~/store";
import { Music } from "~/types";

const store = useStore();
const { activeMusic } = storeToRefs(store);
const route = useRoute("music-id");
const id = route.params.id;

const { data: music, pending } = useFetch<Music[]>(BASE_URL + "/music", {
    query: {
        id,
    },
});

watch(pending, () => {
    console.log("PATCHING WITH NEW MUSIC");
    if (!pending && music.value && music.value[0]) {
        store.$patch({
            activeMusic: music.value[0],
        });
    }
});

useHead({
    title: music.value ? music.value[0].name : id.toString(),
});
</script>

<template>
    <section v-if="pending">Loading...</section>
    <section
        v-else-if="music"
        class="bg-base-200 p-10"
        :style="{
            background: `linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 0.2) ), url('${music[0].cover_url}')`,
            backgroundSize: `cover`,
            backdropFilter: `invert(100px)`,
        }"
    >
        <div
            class="flex flex-col items-center space-y-5 text-center w-full min-h-screen"
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
                                music[0].genre || music[0].tags[0] || "Not Set"
                            }}
                        </p>
                    </div>
                    <div>
                        <p class="subtitle">Tags</p>
                        <div>
                            <span
                                class="badge"
                                v-for="tag in music[0].tags"
                                :key="tag"
                                >{{ tag }}</span
                            >
                        </div>
                    </div>
                </div>
            </div>
            {{ activeMusic }}
        </div>
    </section>
</template>
