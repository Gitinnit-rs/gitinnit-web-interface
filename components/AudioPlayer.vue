<script lang="ts" setup>
import { Ref, onMounted, ref } from "vue";

// Icons
import PlayCircle from "vue-material-design-icons/PlayCircle.vue";
import PauseCircle from "vue-material-design-icons/PauseCircle.vue";
import StopCircle from "vue-material-design-icons/StopCircle.vue";
import ChevronDown from "vue-material-design-icons/ChevronDown.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";

import { useStore } from "~/store";
import { storeToRefs } from "pinia";

const compact = ref(true);
const isPlaying = ref(false);
const isMuted = ref(false);

// Audio Player
const audioPlayer: Ref<HTMLAudioElement | null> = ref(null);

const { activeMusic } = storeToRefs(useStore());

// Audio Player TimingStates
const currentTime = ref("00:00");
const totalTime = ref("00:00");
const interval = ref(setInterval(() => {}));
const percentage = ref(0);

onMounted(() => {
    // Attach event listeners
    attachListeners();

    loadMusic();
});

watch(activeMusic, () => {
    loadMusic();
});

const loadMusic = () => {
    if (!audioPlayer.value || !activeMusic.value) return;

    audioPlayer.value.src = activeMusic.value.music_url;
    audioPlayer.value.load();
};

const play = () => {
    audioPlayer.value?.play();
    isPlaying.value = true;
};

const pause = () => {
    audioPlayer.value?.pause();
    isPlaying.value = false;
};

const toggleCompact = () => {
    compact.value = !compact.value;
};

const togglePlay = () => {
    if (isPlaying.value) pause();
    else play();
};

const toggleMute = () => {
    if (!audioPlayer.value) return;

    isMuted.value = !isMuted.value;

    audioPlayer.value.volume = isMuted.value ? 0 : 1;
};

const stop = () => {
    if (!audioPlayer.value) return;

    pause();

    audioPlayer.value.currentTime = 0;

    updateTime();
};

// Listen to audio playing events
const updateTime = () => {
    currentTime.value = secondsToString(audioPlayer.value?.currentTime || 0);

    updatePercentage();
};

const updatePercentage = () => {
    if (!audioPlayer.value) return;

    percentage.value =
        (audioPlayer.value?.currentTime / audioPlayer.value?.duration) * 100;
};

const attachListeners = () => {
    if (!audioPlayer.value) return;

    audioPlayer.value.oncanplay = function () {
        totalTime.value = secondsToString(audioPlayer.value?.duration || 0);
    };

    audioPlayer.value.onplaying = function () {
        updateTime();

        // Currently only setting if needed to clear later, but fine running in background
        interval.value = setInterval(updateTime, 10);
    };

    audioPlayer.value.onended = function () {
        clearInterval(interval.value);
    };

    audioPlayer.value.onpause = function () {
        clearInterval(interval.value);
    };

    audioPlayer.value.onload = () => {
        if (!audioPlayer.value || !activeMusic.value) return;

        audioPlayer.value.volume = 1;
        audioPlayer.value.currentTime = 0;
        audioPlayer.value.load();
        pause();

        totalTime.value = audioPlayer.value.duration.toString();
    };
};

const seek = (e: MouseEvent) => {
    if (!audioPlayer.value) return;

    const x = e.offsetX;
    const width = (e.target as HTMLDivElement).clientWidth;
    percentage.value = (x / width) * 100;

    audioPlayer.value.currentTime = (audioPlayer.value.duration * x) / width;

    updateTime();
};
</script>

<template>
    <div class="fixed left-[48%] bottom-3 text-white z-50 select-none">
        <transition name="pushup" mode="out-in">
            <div
                v-if="compact"
                class="px-4 bg-blue-500 rounded-full cursor-pointer"
                @click="toggleCompact"
            >
                <DotsHorizontal class="text-xl" />
            </div>
            <div
                class="p-3 bg-blue-500 w-50 relative right-[4.6rem] rounded-lg"
                v-else
            >
                <div class="flex items-center justify-between px-3">
                    <div class="text-2xl cursor-pointer" @click="toggleMute">
                        <!-- Find out how to get sound later -->
                        <VolumeMute v-if="isMuted" />
                        <VolumeHigh v-else />
                    </div>

                    <div
                        class="text-4xl mb-1 cursor-pointer"
                        @click="togglePlay"
                    >
                        <PauseCircle v-if="isPlaying" />
                        <PlayCircle v-else />
                    </div>

                    <div class="text-2xl cursor-pointer" @click="stop">
                        <StopCircle />
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="mt-2">
                    <div class="relative">
                        <div
                            class="bg-blue-600 h-2 rounded-lg cursor-pointer"
                            @click="seek"
                        ></div>
                        <div
                            class="bg-blue-200 h-2 rounded-lg absolute top-0 left-0 pointer-events-none"
                            :style="{
                                width: percentage.toString() + '%',
                                userSelect: 'none',
                            }"
                        ></div>
                    </div>
                    <div
                        class="flex justify-between text-xs font-medium mt-1 text-blue-100"
                    >
                        <span>{{ currentTime }}</span>
                        <span>{{ totalTime }}</span>
                    </div>
                </div>
                <!-- End of Progress Bar -->
                <div
                    class="relative -bottom-2 h-5 right-0 text-center cursor-pointer"
                    @click="toggleCompact"
                >
                    <ChevronDown />
                </div>
            </div>
        </transition>

        <audio
            v-if="activeMusic"
            ref="audioPlayer"
            @ended="isPlaying = false"
        />
    </div>
</template>
