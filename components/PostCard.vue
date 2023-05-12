<script setup lang="ts">
// NOTE: This component uses Reactivity Transform and more from Vue Macros, for learning and experimenting.
// Other components use the normal Vue syntax

import axios from "axios";
import { BASE_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { Post } from "~/types";

const { post } = $defineProps<{
    post: Post;
}>();

let user = $ref(null as any);

// Fetch User details
// const {
//     data: users,
//     error,
//     refresh,
// } = useFetch<any[]>(() => BASE_URL + "/user?id=" + $$(post).value.artist_id);

onMounted(async () => {
    console.log("MOUNTED. POST=", post);

    const { data } = await axios.get(
        BASE_URL + "/user?id=" + $$(post).value.artist_id
    );

    user = data[0];
});
</script>

<template>
    <div class="card bg-gray-100">
        <figure v-if="post.image_url" class="h-60">
            <img
                :src="post.image_url"
                :alt="post.caption"
                style="
                    max-width: 100%;
                    max-height: 100%;
                    width: 100%;
                    object-fit: cover;
                "
            />
        </figure>
        <div class="card-body">
            <p>{{ post.caption }}</p>
            <div class="card-actions mt-3">
                <div
                    v-if="post.type === 'music' && post.media"
                    @click="navigateTo('/music/' + post.media.id)"
                    class="p-3 border rounded-xl w-full hover:bg-gray-200 cursor-pointer transition"
                >
                    <p class="uppercase tracking-widest text-xss text-gray-500">
                        Music
                    </p>
                    <div class="mt-2 flex items-center space-x-3">
                        <img
                            :src="post.media.cover_url || FALLBACK_IMAGE_URL"
                            :alt="post.media.name"
                            class="w-[3rem] h-[3rem] rounded-lg shadow-2xl object-cover"
                        />
                        <div>
                            <h3 class="text-xs font-bold">
                                {{ post.media.name }}
                            </h3>
                            <p
                                v-if="post.media.artists"
                                class="text-xss text-gray-500"
                            >
                                <span
                                    v-for="(artist, i) in post.media.artists"
                                    :key="artist.id"
                                >
                                    {{ artist.name
                                    }}<span
                                        v-if="
                                            i !== post.media.artists.length - 1
                                        "
                                        >,
                                    </span>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    v-if="user"
                    class="mt-4 flex items-center space-x-3 cursor-pointer"
                    @click="navigateTo('/user/' + user.username)"
                >
                    <img
                        :src="user.profile_photo || FALLBACK_IMAGE_URL"
                        :alt="user.username"
                        class="w-[3rem] h-[3rem] rounded-lg shadow-2xl object-cover"
                    />
                    <div>
                        <h2 class="text-sm">{{ user.name }}</h2>
                        <h3 class="text-xs text-gray-500">
                            {{ user.username }}
                        </h3>
                    </div>
                </div>
                <div v-else>
                    {{ post.artist_id }}
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
