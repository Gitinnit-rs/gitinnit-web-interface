<script lang="ts" setup>
import { Music } from "@/types";
import { FALLBACK_IMAGE_URL } from "@/constants";

defineProps<{
    music: Music;
}>();
</script>
<template>
    <div class="w-full rounded-xl p-2 py-3 flex items-center justify-between">
        <div class="flex items-center space-x-6">
            <img
                :src="music.cover_url || FALLBACK_IMAGE_URL"
                class="w-[4.5rem] h-[4.5rem] rounded-lg shadow-2xl object-cover"
                :alt="music.name"
            />
            <div class="py-1">
                <h1 class="font-bold">{{ music.name }}</h1>
                <p v-if="music.artists" class="text-xs">
                    <span v-for="(artist, i) in music.artists" :key="artist.id">
                        {{ artist.name }}
                        <span v-if="i !== music.artists.length - 1">, </span>
                    </span>
                </p>
            </div>
        </div>

        <div>
            <slot name="actions" />
        </div>
    </div>
</template>
