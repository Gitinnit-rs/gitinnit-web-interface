<script lang="ts" setup>
import { ref } from "vue";

// Icons
import PlusIcon from "vue-material-design-icons/PlusCircle.vue";

import { useUserStore } from "~/store/user.store";

import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/vue";
import { storeToRefs } from "pinia";
import { BASE_URL } from "~/constants";
import { Music } from "~/types";

const isOpen = ref(false);

const store = useUserStore();
const { user } = storeToRefs(store);

// v-model
const props = defineProps<{
    modelValue: Music | null;
}>();
const emit = defineEmits(["update:modelValue"]);

const selectedMusic = useVModel(props, "modelValue", emit);

function closeModal() {
    isOpen.value = false;
}
function openModal() {
    isOpen.value = true;
}

// Fetch user's music
const {
    data: musicList,
    error,
    pending,
} = useFetch<Music[]>(BASE_URL + `/music?artist_id=${user.value.id}`);
</script>

<template>
    <button
        type="button"
        @click="openModal"
        class="btn btn-sm btn-accent space-x-1"
    >
        <PlusIcon class="mb-1" /> <span>Select Music</span>
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
                            <div v-if="error">An error occured</div>
                            <div v-else-if="pending">Loading...</div>
                            <div v-else>
                                <DialogTitle
                                    as="h3"
                                    class="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Select Music
                                </DialogTitle>
                                <div class="mt-0.5">
                                    <p class="text-sm">
                                        Pick a favorite to share!
                                    </p>
                                </div>

                                <div
                                    class="text-gray-700"
                                    style="max-height: 400px; overflow-y: auto"
                                >
                                    <DisplayItem
                                        v-for="item in musicList"
                                        :key="item.id"
                                        :item="item"
                                        :hoverable="true"
                                        @click="
                                            () => {
                                                selectedMusic = item;
                                                closeModal();
                                            }
                                        "
                                        class="cursor-pointer"
                                    >
                                    </DisplayItem>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
