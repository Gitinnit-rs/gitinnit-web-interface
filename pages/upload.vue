<script setup lang="ts">
import { Transition } from "vue";
// @ts-ignore
import Vue3TagsInput from "vue3-tags-input";

import VueMultiSelect from "vue-multiselect";
import { useUserStore } from "~/store/user.store";

import axios from "axios";

import { BASE_URL } from "../constants";

import { useToast } from "vue-toastification";

useHead({
    title: "Upload",
});

const toast = useToast();

const previewURL = ref("");
const previewImage = ref(null as HTMLImageElement | null);

const artistList = ref([]);
const selectedArtistsList = ref([]);

const data = reactive({
    tags: [] as string[],
    // public: true, // should use "private" ideally
});

onMounted(() => {
    findArtists("");
});

async function submit(e: Event | SubmitEvent) {
    toast.info("Starting upload", { timeout: 6000 });

    const formData = new FormData(e.target as HTMLFormElement);
    let user = useUserStore();

    let artists_list = selectedArtistsList.value.map((artist: any) => {
        return artist.id;
    });

    const data_object = {
        name: formData.get("name"),
        artists: artists_list,
        // access_token: user.$state.user.access_token,
        tags: data.tags,
        music_file: formData.get("music_file"),
        image_file: formData.get("image_file"),
    };
    const url = BASE_URL + "/music/";
    const res = await axios.post(url, data_object, {
        headers: {
            Authorization: `Bearer ${user.$state.user.access_token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    console.log("Response", res.data);

    if (res.status === 200) {
        toast.success("Your music is live! Click to open", {
            timeout: 6000,
            pauseOnHover: true,
            onClick(closeToast) {
                navigateTo(`/music/${res.data.id}`);
                closeToast();
            },
        });
    } else {
        toast.error("An error occurred");
    }
}

function onImageChange(e: any) {
    animateImageChange(e, previewURL, previewImage);
}

// async function searchUserByName(e: Event | InputEvent) {
//     const name = (e.target as HTMLInputElement).value;

//     if (!name) return;

//     const result = await getUsersByName(name);
//     if (result) console.log("User search by name results", result.data);
// }

async function findArtists(query: string) {
    let user = useUserStore();

    if (query === "") {
        query = "*";
    }
    const result = await getUsersByName(query);
    artistList.value = result.data.filter(
        //@ts-ignore
        (obj) => obj.id !== user.$state.user.id
    );
    // Update artistList based on query
}

function handleChangeTag(tags: string[]) {
    data.tags = tags;
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
                <!-- <div class="form-control">
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
                            @input="searchUserByName"
                        />
                    </label>
                </div> -->
            </div>

            <div class="w-1/2 form-control">
                <label class="label">Artists</label>
                <VueMultiSelect
                    class="multiselect"
                    placeholder="Search artists"
                    label="name"
                    track-by="id"
                    :multiple="true"
                    v-model="selectedArtistsList"
                    :options="artistList"
                    @search-change="findArtists"
                >
                    <template #noResult> Oops! No artists found. </template>
                </VueMultiSelect>
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
                <vue3-tags-input
                    :tags="data.tags"
                    placeholder="Tags"
                    @on-tags-changed="handleChangeTag"
                />
            </div>

            <!-- <div class="form-control w-30 mt-5">
                <label class="cursor-pointer label">
                    <span class="label-text">Public</span>
                    <input
                        type="checkbox"
                        v-model="data.public"
                        class="h-4 w-4 cursor-pointer"
                    />
                </label>
            </div> -->

            <button type="submit" class="btn btn-secondary">
                Create Music
            </button>
        </form>
        <Transition name="fade" mode="out-in">
            <img
                ref="previewImage"
                :src="previewURL"
                class="w-xs h-xs rounded-lg shadow-2xl object-cover border"
                v-if="previewURL"
            />
            <div
                v-else
                class="w-xs h-xs bg-base-200 rounded-lg grid place-items-center"
            >
                <p class="text-sm text-gray-500">Image Preview</p>
            </div>
        </Transition>
    </section>
</template>
