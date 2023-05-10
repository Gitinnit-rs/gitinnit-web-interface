<script setup lang="ts">
import { BASE_URL } from "~/constants";
import { Music } from "~/types";

useHead({
    title: "Dashboard",
});

/// Fetch all music, albums, users and posts data ///

// Fetch music
const { data: music, pending, error } = useFetch<Music[]>(BASE_URL + "/music");
const {
    data: user,
    pending: pendingUser,
    error: errorUser,
} = useFetch<any[]>(BASE_URL + "/user/*");

console.log("USER DATA", user);
</script>
<template>
    <section v-if="error || errorUser" class="p-10">
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
                    An error occurred while fetching data<br />Music Errors:
                    {{ error || "None" }}<br />User data Error: {{ errorUser || "None" }}
                </span>
            </div>
        </div>
    </section>
    <section v-else-if="pending && !music">Loading...</section>
    <div v-else class="bg-base-300">
        <!-- Hero Section -->
        <section class="hero p-5 bg-base-300">
            <div class="hero-content flex-col lg:flex-row space-x-5">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_Ufk5pON5I9UyQcWYdvFZj_dxZaDITOQ3w&usqp=CAU"
                    class="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 class="text-5xl font-bold">New Releases</h1>
                    <p class="py-6">
                        Listen to the Top 10 new releases on Gitinnit
                    </p>
                    <button class="btn btn-primary">Get Started</button>
                </div>
            </div>
        </section>

        <section class="bg-base-100 p-10 rounded-t-4xl">
            <h1 class="uppercase tracking-widest text-xs text-gray-500">
                Latest releases
            </h1>
            <div class="-ml-3">
                <div
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                >
                    <template v-for="item in music" :key="item.id">
                        <NuxtLink :to="'/music/' + item.id">
                            <MusicDisplayItem :music="item"> </MusicDisplayItem>
                        </NuxtLink>
                    </template>
                </div>
            </div>
        </section>
    </div>
</template>
