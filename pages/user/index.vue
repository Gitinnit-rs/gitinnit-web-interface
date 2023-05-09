<script lang="ts" setup>
import { BASE_URL } from "~/constants";
import { Album, Music } from "~/types";
import { useUserStore } from "~/store/user.store";
import { storeToRefs } from "pinia";
import { getUserFollowers } from "~/utils/user";

useHead({
    title: "Profile",
});

const router = useRouter();
const store = useUserStore();
const { user: loggedInUser } = storeToRefs(store);
const isLoggedIn = computed(() => {
    return loggedInUser.value && loggedInUser.value;
});

const {
    data: user,
    pending,
    error,
} = await useFetch<any[]>(
    BASE_URL +
        "/user?includeMusic=true&includeAlbum=true&username=" +
        loggedInUser.value?.login
);

const music = computed(() => (user.value as any[])[0].music as Music[]);
const album = computed(() => (user.value as any[])[0].album as Album[]);
const followers = ref([]);
followers.value = await getUserFollowers((user.value as any[])[0].id);
console.log(followers.value.length);

//print all key value pairs of album[0]
for (const [key, value] of Object.entries(album.value[0])) {
    console.log(`${key}: ${value}`);
}

onMounted(() => {
    if (!isLoggedIn.value) {
        router.push("/");
    }
});
</script>
<template>
    <section v-if="!loggedInUser.login" class="p-10">
        <h1>Profile {{ loggedInUser.login }} not found</h1>
    </section>
    <section v-else-if="pending && !user && !music">Loading...</section>
    <section v-else-if="error && !user && !music" class="p-10">
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
                    An error occurred while fetching user details<br />{{
                        error
                    }}
                </span>
            </div>
        </div>
    </section>
    <section v-else-if="user">
        <div class="hero py-10 bg-base-200">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <img
                        :src="user[0].profile_photo"
                        class="w-[20rem] h-[20rem] rounded-lg shadow-2xl object-cover"
                        alt="Gitinnit User's Profile Image"
                    />
                    <div class="mt-6">
                        <h1 class="text-4xl font-bold">{{ user[0].name }}</h1>
                        <p class="mt-1">{{ user[0].bio }}</p>
                    </div>
                </div>
            </div>
        </div>
        <h3>Number of followers {{ followers.length }}</h3>

        <div class="p-10">
            <h1 class="text-4xl font-bold">Music</h1>

            <!-- List of Music Items -->
            <div class="mt-6 w-1/2">
                <p v-if="!music || music.length === 0">No music yet.</p>
                <template v-else>
                    <MusicItem
                        v-for="item in music"
                        :key="item.id"
                        :music="item"
                    />
                </template>
            </div>

            <!-- list of album items -->
            <div class="mt-6 w-1/2">
                <p v-if="!music || music.length === 0">No albums yet.</p>
                <template v-else>
                    <AlbumItem
                        v-for="item in album"
                        :key="item.id"
                        :album="item"
                        :artist_name="user[0].name"
                    />
                </template>
            </div>
        </div>
    </section>
</template>
