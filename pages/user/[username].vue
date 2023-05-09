<script lang="ts" setup>
import { BASE_URL } from "~/constants";
import { Music, Album } from "~/types";
import { useUserStore } from "~/store/user.store";
import { storeToRefs } from "pinia";
import { getUserFollowers, followUser, unfollowUser } from "~/utils/user";

const route = useRoute();
const router = useRouter();

const username = route.params.username;

const store = useUserStore();
const { user: loggedInUser } = storeToRefs(store);

const isLoggedIn = computed(() => {
    return loggedInUser.value && true;
});
const isLoggedInUser = computed(() => loggedInUser.value?.login === username);

const {
    data: user,
    pending,
    error,
} = await useFetch<any[]>(
    BASE_URL + "/user?includeMusic=true&includeAlbum=true&username=" + username
);

const music = computed(
    () => user.value && ((user.value as any[])[0].music as Music[])
);
const album = computed(
    () => user.value && ((user.value as any[])[0].album as Album[])
);
const followers: Ref<Array<any>> = ref([]);
// const isFollowing=computed(()=>followers.value.includes(loggedInUser.value?.id))

async function getFollowers() {
    followers.value = await getUserFollowers((user.value as any[])[0].id);
}

async function followUserRef(
    follower_id: string,
    following_id: string,
    bearer_token: string
) {
    await followUser(follower_id, following_id, bearer_token);
    await getFollowers();
}

async function unfollowUserRef(
    follower_id: string,
    following_id: string,
    bearer_token: string
) {
    await unfollowUser(follower_id, following_id, bearer_token);
    await getFollowers();
}

const userId = ref((user.value as any[])[0].id);
const loggedInUserId = ref(loggedInUser.value?.id);
const loggedInUserAccessToken = ref(loggedInUser.value?.access_token);

followers.value = await getUserFollowers((user.value as any[])[0].id);
console.log(followers.value);

// const follow = await followUser(loggedInUserId.value, userId.value);
// console.log(follow);

useHead({
    title: user.value ? user.value[0].name : "User",
});

onMounted(() => {
    // console.log(
    //     loggedInUserId.value,
    //     userId.value
    //     loggedInUserAccessToken.isLoggedIn.value
    // );
    if (isLoggedInUser.value) {
        router.push("/user");
    }
});

console.log({ music, user });
</script>
<template>
    <section v-if="!username" class="p-10">
        <h1>Profile {{ username }} not found</h1>
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

        <section v-if="isLoggedIn">
            <button
                v-if="!followers.includes(loggedInUserId)"
                class="btn btn-primary"
                @click="
                    followUserRef(
                        loggedInUserId,
                        userId,
                        loggedInUserAccessToken
                    )
                "
            >
                Follow User
            </button>

            <button
                v-else
                class="btn btn-primary"
                @click="
                    unfollowUserRef(
                        loggedInUserId,
                        userId,
                        loggedInUserAccessToken
                    )
                "
            >
                Unfollow User
            </button>
            <h3>Number of followers {{ followers.length }}</h3>
        </section>

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
        </div>

        <div class="p-10">
            <h1 class="text-4xl font-bold">Albums</h1>

            <!-- List of album Items -->
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
