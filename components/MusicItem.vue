<script lang="ts" setup>
import { FALLBACK_IMAGE_URL } from "~/constants";
import { Music } from "~/types";

defineProps<{
    music: Music;
}>();

const router = useRouter();
</script>
<template>
    <div
        class="w-full hover:bg-gray-100 rounded-xl cursor-pointer transition p-2 py-3 flex items-center justify-between"
        @click="router.push('/music/' + music.id)"
    >
        <div class="flex items-center space-x-8">
            <img
                :src="music.cover_url || FALLBACK_IMAGE_URL"
                class="w-[6rem] h-[6rem] rounded-lg shadow-2xl object-cover"
                alt="Gitinnit Music Profile Image"
            />
            <div class="py-1">
                <h1 class="text-3xl font-bold">{{ music.name }}</h1>
                <p>
                    <span v-for="(artist, i) in music.artists" :key="artist.id">
                        <!-- :to="'/user/' + artist.username" -->
                        <span>{{ artist.name }}</span
                        ><span v-if="i !== music.artists.length - 1"
                            >,
                        </span></span
                    >
                </p>
            </div>
        </div>

        <!-- <div>play</div> -->
    </div>
</template>
