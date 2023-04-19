<script lang="ts" setup>
import { BASE_URL } from "~/constants";

const route = useRoute();

const id = route.params.id;
// 1ab2ed3d-f15b-4ea8-b03e-2e3bb42716cb

const { data: user, pending, error } = useFetch(BASE_URL + "/user/" + id);
</script>
<template>
  <section v-if="!id" class="p-10">
    <h1>Profile with id {{ id }} not found</h1>
  </section>
  <section v-else-if="pending && !user">Loading...</section>
  <section v-else-if="error && !user" class="p-10">
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
          An error occurred while fetching user details<br />{{ error }}</span
        >
      </div>
    </div>
  </section>
  <section v-else>
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

    <div class="p-10">
      <h1 class="text-4xl font-bold">Music</h1>

      <!-- List of Music Items -->
      <div class="mt-6 w-1/2">
        <MusicItem v-for="n in 5" :key="n" />
      </div>
    </div>
  </section>
</template>
