<script lang="ts" setup>
import { ref } from "vue";

// Icons
import PlusIcon from "vue-material-design-icons/PlusCircle.vue";

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(false);

function closeModal() {
    isOpen.value = false;
}
function openModal() {
    isOpen.value = true;
}

async function submit() {}
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
