<script lang="ts" setup>
import { ref } from "vue";

// Icons
import PlusIcon from "vue-material-design-icons/PlusCircle.vue";
import axios from "axios";
import { useUserStore } from "~/store/user.store";
import { BASE_URL } from "../constants";

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";
import { Music } from "~/types";
import { useToast } from "vue-toastification";

const toast = useToast();

const isOpen = ref(false);

const selectedMusic = ref(null as Music | null);

function closeModal() {
    isOpen.value = false;
}
function openModal() {
    isOpen.value = true;
}

async function submit(e: Event | SubmitEvent) {
    toast.info("Creating post...", { id: "creation" });

    const formData = new FormData(e.target as HTMLFormElement);
    let user = useUserStore();

    const data_object = {
        caption: formData.get("post_content"),
        type: "text",
        image_file: formData.get("image_file"),
    };
    if (selectedMusic) {
        data_object.type = "music";
        //@ts-ignore
        data_object.content_id = selectedMusic.value?.id;
    }
    const url = BASE_URL + "/post/";

    try {
        const res = await axios.post(url, data_object, {
            headers: {
                Authorization: `Bearer ${user.$state.user.access_token}`,
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Response", res.data);

        toast.dismiss("creation");
        toast.success("Posted!");
    } catch (e) {
        console.error("Error while creating post", e);
        toast.dismiss("creation");
        toast.error("Error while creating post");
    }
}
</script>

<template>
    <button
        type="button"
        @click="openModal"
        class="btn btn-sm btn-info-content space-x-1"
    >
        <PlusIcon class="mb-1" /> <span>Post</span>
    </button>

    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                New Post
                            </DialogTitle>
                            <div class="mt-1">
                                <p class="text-sm text-gray-500">
                                    Create a new post to share with your
                                    followers!
                                </p>
                            </div>
                            <form @submit.prevent="submit">
                                <div class="mt-4">
                                    <textarea
                                        id="post_content"
                                        name="post_content"
                                        class="w-4/5 resize-none textarea textarea-bordered textarea-secondary"
                                        placeholder="My New Post!"
                                        required
                                    ></textarea>

                                    <div class="form-control w-full max-w-xs">
                                        <label class="label" for="image_file">
                                            <span class="label-text"
                                                >Image (Optional)</span
                                            >
                                        </label>
                                        <input
                                            type="file"
                                            id="image_file"
                                            name="image_file"
                                            class="file-input file-input-sm file-input-bordered w-full max-w-xs"
                                            accept="image/*"
                                        />
                                    </div>

                                    <div class="mt-2 form-control max-w-xs">
                                        <label class="label" for="image_file">
                                            <span class="label-text"
                                                >Music (Optional)</span
                                            >
                                        </label>
                                        <MusicList v-model="selectedMusic" />
                                    </div>
                                    <DisplayItem
                                        v-if="selectedMusic"
                                        :item="selectedMusic"
                                        class="text-gray-700 mt-2"
                                    >
                                        <template #actions>
                                            <span
                                                class="text-xs text-red-500 hover:underline cursor-pointer"
                                                @click="selectedMusic = null"
                                                >Remove</span
                                            >
                                        </template>
                                    </DisplayItem>
                                </div>

                                <div class="mt-4">
                                    <button
                                        type="submit"
                                        class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    >
                                        Post
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
