<script lang="ts" setup>
import { FALLBACK_IMAGE_URL } from "@/constants";

defineProps<{
    item: any;
    hoverable?: boolean;
}>();
</script>
<template>
    <div
        class="w-full rounded-xl p-2 py-3 flex items-center justify-between"
        :class="hoverable && 'hover:bg-gray-100 transition'"
    >
        <div class="flex items-center space-x-6">
            <img
                :src="
                    item.cover_url || item.profile_photo || FALLBACK_IMAGE_URL
                "
                class="w-[4.5rem] h-[4.5rem] rounded-lg shadow-2xl object-cover"
                :alt="item.name"
            />
            <div class="py-1">
                <h1 class="font-bold">{{ item.name }}</h1>
                <h3 v-if="item.username" class="text-sm text-gray-500">
                    {{ item.username }}
                </h3>
                <p v-if="item.artists" class="text-xs">
                    <span v-for="(artist, i) in item.artists" :key="artist.id">
                        {{ artist.name
                        }}<span v-if="i !== item.artists.length - 1">, </span>
                    </span>
                </p>
            </div>
        </div>

        <div>
            <slot name="actions" />
        </div>
    </div>
</template>
