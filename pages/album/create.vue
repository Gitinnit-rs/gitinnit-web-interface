<script lang="ts" setup>
import { MusicDisplayItemInterface } from "@/types";
import { useDebounceFn } from "@vueuse/core";

// Icons
import DeleteIcon from "vue-material-design-icons/Delete.vue";

useHead({
  title: "New Album",
});

const previewURL = ref("");
const previewImage = ref(null as HTMLImageElement | null);

// Data
const name = ref("");

// Search Music
const query = ref("");
const musicList = ref([
  {
    id: 1,
    name: "Animals",
    cover_url: "",
    artists: ["Martin Garrix"],
  },
  {
    id: 2,
    name: "Lion in the field",
    cover_url: "",
    artists: ["KSHMR"],
  },
  {
    id: 3,
    name: "GDFR",
    cover_url: "",
    artists: ["Florida"],
  },
] as MusicDisplayItemInterface[]);
const selectedMusicList = ref([]);

async function submit(e: Event | SubmitEvent) {
  const formData = new FormData(e.target as HTMLFormElement);

  // Testing
  for (const [key, val] of formData.entries()) {
    console.log(`${key}: ${val}`);
  }
}

const findMusic = useDebounceFn(async () => {}, 100);

function onImageChange(e: any) {
  animateImageChange(e, previewURL, previewImage);
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
      </form>

      <div class="mt-10">
        <h1 class="font-semibold text-xl">
          Select your music to include in the album
        </h1>

        <input
          type="text"
          placeholder="Select your music"
          id="name"
          name="name"
          class="mt-3 w-full md:w-1/2 input input-bordered"
          v-model="query"
          @input="findMusic"
        />
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
          v-for="music in musicList"
          :key="music.id"
          :music="music"
          class="group"
        >
          <template #actions>
            <div class="hidden group-hover:block">
              <DeleteIcon class="text-red-400" />
            </div>
          </template>
        </MusicDisplayItem>
      </div>
    </div>
  </section>
</template>
