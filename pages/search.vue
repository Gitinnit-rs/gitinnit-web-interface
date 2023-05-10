<script lang="ts" setup>
import { BASE_URL } from "~/constants";

useHead({
    title: "Search",
});

const route = useRoute();
const query = ref(route.query.q);
const url = computed(() => `${BASE_URL}/search/${query.value}`);

const { data, pending, error } = useFetch<any[]>(url);

const users = computed(() =>
    data.value?.filter((item) => item.type === "user")
);
const music = computed(() =>
    data.value?.filter((item) => item.type === "music")
);
const albums = computed(() =>
    data.value?.filter((item) => item.type === "album")
);

watch(
    () => route.query,
    () => {
        query.value = route.query.q;
    }
);

console.log("Search data", data);
</script>

<template>
    <section v-if="pending">Loading...</section>
    <section v-else-if="error" class="p-10">
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
                    An error occurred while fetching search results<br />{{
                        error
                    }}
                </span>
            </div>
        </div>
    </section>
    <section v-else>
        <section class="bg-base-300 p-10 pt-20">
            <h1 class="text-md font-">Search Results for</h1>
            <h1 class="text-4xl font-bold">{{ query }}</h1>
        </section>

        <section v-if="data?.length === 0" class="p-10">
            No results found
        </section>
        <section v-else class="p-10 space-y-5">
            <div>
                <h1 class="font-bold text-2xl">Users</h1>
                <div v-if="users && users.length > 0" class="responsive-grid">
                    <NuxtLink
                        v-for="user in users"
                        :key="user.id"
                        :to="`/user/${user.username}`"
                    >
                        <DisplayItem :item="user" :hoverable="true" />
                    </NuxtLink>
                </div>
                <p class="mt-2.5" v-else>No users found</p>
            </div>
            <div>
                <h1 class="font-bold text-2xl">Music</h1>
                <div v-if="music && music.length > 0" class="responsive-grid">
                    <NuxtLink
                        v-for="item in music"
                        :key="item.id"
                        :to="`/music/${item.id}`"
                    >
                        <DisplayItem :item="item" :hoverable="true" />
                    </NuxtLink>
                </div>
                <p class="mt-2.5" v-else>No music found</p>
            </div>
            <div>
                <h1 class="font-bold text-2xl">Albums</h1>
                <div v-if="albums && albums.length > 0" class="responsive-grid">
                    <NuxtLink
                        v-for="album in albums"
                        :key="album.id"
                        :to="`/album/${album.id}`"
                    >
                        <DisplayItem :item="album" :hoverable="true" />
                    </NuxtLink>
                </div>
                <p class="mt-2.5" v-else>No albums found</p>
            </div>
        </section>
    </section>
</template>
