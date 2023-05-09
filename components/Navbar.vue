<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { AUTH_URL, FALLBACK_IMAGE_URL } from "~/constants";
import { useUserStore } from "~/store/user.store";
import { logout } from "~/utils/auth";

// Icons
import AccountIcon from "vue-material-design-icons/Account.vue";
import PlusIcon from "vue-material-design-icons/PlusCircle.vue";
import SettingsIcon from "vue-material-design-icons/Cog.vue";

const store = useUserStore();
const { user } = storeToRefs(store);

const loggedIn = computed(() => {
    return user.value && user.value.access_token;
});

const redirectURL = ref("");

onMounted(() => {
    const returnURL = window.location.origin + `/authCallback`;
    redirectURL.value = `${AUTH_URL}/auth/github/?returnUrl=${returnURL}`;
});
</script>

<template>
    <nav class="navbar bg-base-300">
        <div class="flex-none">
            <button class="btn btn-square btn-ghost">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-5 h-5 stroke-current"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </button>
        </div>
        <div class="flex-1">
            <NuxtLink
                to="/"
                role="button"
                class="btn btn-ghost normal-case text-xl"
                >Gitinnit</NuxtLink
            >
        </div>
        <div class="flex-none gap-2">
            <NuxtLink
                to="/upload"
                role="button"
                class="btn btn-sm btn-secondary"
            >
                Upload
            </NuxtLink>
            <div class="form-control">
                <input
                    type="text"
                    placeholder="Search"
                    class="input input-bordered"
                />
            </div>
            <div class="dropdown dropdown-end bg-base-300">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img
                            :src="user ? user.avatar_url : FALLBACK_IMAGE_URL"
                        />
                    </div>
                </label>
                <ul
                    tabindex="0"
                    class="mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                    <div
                        v-if="user"
                        class="p-5 bg-info-content text-white rounded-t-xl"
                    >
                        <h3 v-if="user.name" class="text-sm font-semibold">
                            {{ user.name }}
                        </h3>
                        <p class="text-xs text-gray-300">@{{ user.login }}</p>
                    </div>
                    <li class="pt-1">
                        <NuxtLink to="/user">
                            <span><AccountIcon /></span>
                            <span> Profile </span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/album/create">
                            <span><PlusIcon /></span>
                            <span> New Album </span>
                        </NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/user">
                            <span><SettingsIcon /></span>
                            <span> Settings </span>
                        </NuxtLink>
                    </li>

                    <li v-if="loggedIn">
                        <NuxtLink to="/" @click="logout()"> Logout </NuxtLink>
                    </li>
                    <li v-else>
                        <a :href="redirectURL" class="justify-between">
                            Login
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
