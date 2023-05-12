<script lang="ts" setup>
import { FALLBACK_IMAGE_URL } from "~/constants";
import { Album } from "~/types";

defineProps<{
    album: Album;
    artist_name: string;
}>();

const router = useRouter();
</script>
<template>
    <div
        class="w-full hover:bg-gray-100 rounded-xl cursor-pointer transition p-2 py-3 flex items-center justify-between"
        @click="router.push('/album/' + album.id)"
    >
        <div class="flex items-center space-x-8">
            <img
                :src="album.cover_url || FALLBACK_IMAGE_URL"
                class="w-[6rem] h-[6rem] rounded-lg shadow-2xl object-cover"
                alt="Gitinnit Music Profile Image"
            />
            <div class="py-1">
                <h1 class="text-3xl font-bold">{{ album.name }}</h1>
                <p>
                    <span>
                        <NuxtLink
                            :to="'/user/' + artist_name"
                            class="hover:text-pink-600 cursor-pointer transition"
                            >{{ artist_name }}</NuxtLink
                        ></span
                    >
                </p>
            </div>
        </div>

        <!-- <div>play</div> -->
    </div>
</template>
