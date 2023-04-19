<script setup lang="ts">
// @ts-ignore
import Vue3TagsInput from "vue3-tags-input";

const previewURL = ref("");

useHead({
  title: "Upload",
});

const data = reactive({
  tags: [] as string[],
  public: true, // should use "private" ideally
});

async function submit(e: Event | SubmitEvent) {
  const formData = new FormData(e.target as HTMLFormElement);

  // Testing
  for (const [key, val] of formData.entries()) {
    console.log(`${key}: ${val}`);
  }

  // Note: Full data is FormData + data reactive object
}

function onImageChange(e: any) {
  const file = e.target.files[0];
  previewURL.value = URL.createObjectURL(file);
}

function searchUserByName(e: Event | InputEvent) {
  console.log("Called");
  const name = (e.target as HTMLInputElement).value;
  const { data } = getUsersByName(name);
  console.log("User search by name results", data);
}
</script>

<template>
  <section class="bg-base-300 p-10 pt-20">
    <h1 class="text-4xl font-bold">Upload</h1>
  </section>

  <!-- Upload Form Section -->
  <section class="p-10 space-y-10 md:(grid grid-cols-3 space-y-0)">
    <form @submit.prevent="submit" class="col-span-2 space-y-5">
      <div class="md:(flex space-x-3)">
        <div class="form-control">
          <label class="label" for="name">
            <span class="label-text">Name</span>
          </label>
          <label class="input-group">
            <span>Name</span>
            <input
              type="text"
              placeholder="Sandstorm"
              id="name"
              name="name"
              class="input input-bordered"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label" for="artists">
            <span class="label-text">Artists</span>
          </label>
          <label class="input-group">
            <span>Artists</span>
            <input
              type="text"
              id="artists"
              name="artists"
              placeholder="Darude, Drake"
              class="input input-bordered"
              @change="searchUserByName"
            />
          </label>
        </div>
      </div>

      <div class="md:(flex space-x-3)">
        <div class="form-control">
          <label class="label" for="music_file">
            <span class="label-text">Music file</span>
          </label>

          <input
            type="file"
            id="music_file"
            name="music_file"
            class="file-input file-input-bordered w-full max-w-xs"
            accept="audio/*"
          />
        </div>
        <div class="form-control">
          <label class="label" for="image_file">
            <span class="label-text">Image file</span>
          </label>

          <input
            type="file"
            id="image_file"
            name="image_file"
            class="file-input file-input-bordered w-full max-w-xs"
            accept="image/*"
            @change="onImageChange"
          />
        </div>
      </div>

      <div class="form-control w-4/5">
        <label class="label">
          <span class="label-text">Tags</span>
        </label>
        <vue3-tags-input :tags="data.tags" placeholder="Tags" />
      </div>

      <div class="form-control w-30 mt-5">
        <label class="cursor-pointer label">
          <span class="label-text">Public</span>
          <input
            type="checkbox"
            v-model="data.public"
            class="h-4 w-4 cursor-pointer"
          />
        </label>
      </div>

      <button type="submit" class="btn btn-secondary">Create Music</button>
    </form>
    <div>
      <!-- src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_Ufk5pON5I9UyQcWYdvFZj_dxZaDITOQ3w&usqp=CAU" -->
      <img
        :src="previewURL"
        class="w-xs h-xs rounded-lg shadow-2xl object-contain border"
        v-if="previewURL"
      />
      <div
        v-else
        class="w-xs h-xs bg-base-200 rounded-lg grid place-items-center"
      >
        <p class="text-sm text-gray-500">Image Preview</p>
      </div>
    </div>
  </section>
</template>