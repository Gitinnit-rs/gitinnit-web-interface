<script lang="ts" setup>
import { Music, MusicDisplayItemInterface } from "@/types";
import { useDebounceFn } from "@vueuse/core";
import { useUserStore } from "~/store/user.store";

import axios from "axios";

// Icons
import MinusIcon from "vue-material-design-icons/MinusCircle.vue";
import PlusIcon from "vue-material-design-icons/PlusCircle.vue";

import { BASE_URL } from "~/constants";

useHead({
  title: "New Album",
});

const previewURL = ref("");
const previewImage = ref(null as HTMLImageElement | null);

// Data
const name = ref("");

// Search/Select Music
// const query = ref("");
const musicList = ref([] as Music[]);
const selectedMusicList: typeof musicList = ref([]);

onMounted(() => {
  fetchMusic();
});

async function submit(e: Event | SubmitEvent) {
  let user = useUserStore();
  const formData = new FormData(e.target as HTMLFormElement);

  const data_object = {
    name: formData.get("name"),
    image_file: formData.get("image_file"),
    musics: selectedMusicList,
  };
  const url = BASE_URL + "/music/album/";
  const res = await axios.post(url, data_object, {
    headers: {
      Authorization: `Bearer ${user.$state.user.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("Response", res.data);
}

// const findMusic = useDebounceFn(async () => {}, 100);

async function fetchMusic() {
  // Move this later to utils/music.ts

  const { data, status } = await axios(BASE_URL + "/music?artist_id=123213");

  if (status !== 200) {
    console.error("Error while fetching user's music");
  }

  console.log("Music Data", data);

  musicList.value = data;
}

function onImageChange(e: any) {
  animateImageChange(e, previewURL, previewImage);
}

function addToList(music: any) {
  if (selectedMusicList.value.includes(music)) return;

  selectedMusicList.value.push(music);
  musicList.value.splice(musicList.value.indexOf(music), 1);
}

function removeFromList(music: any) {
  selectedMusicList.value.splice(selectedMusicList.value.indexOf(music), 1);
  musicList.value.push(music);
}
</script>

<template>
  <section class="bg-base-300 p-10 pt-20">
    <h1 class="text-4xl font-bold">New Album</h1>
  </section>

  <section class="p-10 space-y-10 md:(grid grid-cols-3 space-y-0)">
    <div class="col-span-2">
      <form @submit.prevent="submit">
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Name</span>
          </label>
          <label class="input-group">
            <span>Name</span>
            <input
              type="text"
              placeholder="Kamikaze"
              id="name"
              name="name"
              class="w-full md:w-1/2 input input-bordered"
              v-model="name"
              required
            />
          </label>
        </div>

        <div class="form-control mt-3">
          <label class="label" for="image_file">
            <span class="label-text">Album Cover Image</span>
          </label>

          <input
            type="file"
            id="image_file"
            name="image_file"
            class="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            @change="onImageChange"
            required
          />
        </div>

        <button class="mt-5 btn btn-primary">Create Album</button>
      </form>

      <div class="mt-10">
        <h1 class="font-semibold text-xl">
          Select your music to include in the album
        </h1>

        <!-- <input
          type="text"
          placeholder="Select your music"
          id="name"
          name="name"
          class="mt-3 w-full md:w-1/2 input input-bordered"
          v-model="query"
          @input="findMusic"
        /> -->

        <div class="mt-4">
          <p class="text-gray-400" v-if="musicList.length === 0">
            No music found.
            <NuxtLink to="/upload" class="link"> Upload some!</NuxtLink>
          </p>

          <MusicDisplayItem
            v-for="music in musicList"
            :key="music.id"
            :music="music"
            class="md:w-1/2"
          >
            <template #actions>
              <PlusIcon
                class="text-green-600 hover:text-green-500 transition cursor-pointer"
                @click="addToList(music)"
              />
            </template>
          </MusicDisplayItem>
        </div>
      </div>
    </div>
    <div class="col-span-1">
      <div class="flex space-x-5 items-center w-full">
        <Transition name="fade" mode="out-in">
          <!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_Ufk5pON5I9UyQcWYdvFZj_dxZaDITOQ3w&usqp=CAU" -->
          <img
            ref="previewImage"
            :src="previewURL"
            class="w-[6rem] h-[6rem] rounded-lg shadow-2xl object-cover border"
            v-if="previewURL"
          />
          <div
            v-else
            class="w-[6rem] h-[6rem] bg-base-200 rounded-lg grid place-items-center"
          >
            <p class="text-xss text-gray-500">Image Preview</p>
          </div>
        </Transition>

        <div>
          <h1 class="font-semibold">{{ name || "Album Name" }}</h1>

          <!-- Logged-In User's Name here -->
          <p class="text-xs text-gray-500">Martin Garrix</p>
        </div>
      </div>

      <!-- Selected Music List -->
      <div class="mt-5">
        <MusicDisplayItem
          v-for="music in selectedMusicList"
          :key="music.id"
          :music="music"
        >
          <template #actions>
            <MinusIcon
              @click="removeFromList(music)"
              class="text-red-600 hover:text-red-500 transition cursor-pointer"
            />
          </template>
        </MusicDisplayItem>
      </div>
    </div>
  </section>
</template>
