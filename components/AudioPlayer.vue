<script lang="ts" setup>
// Icons
import PlayIcon from "vue-material-design-icons/Play.vue";
import PauseIcon from "vue-material-design-icons/Pause.vue";
import StopIcon from "vue-material-design-icons/Stop.vue";
</script>
<template>
  <div class="fixed bottom-5 left-[5%] w-[90%] bg-blue-300 rounded-lg">
    <!-- Progress Slider -->
    <div class="bg-blue-500 py-2 rounded-t-lg"></div>
    <!-- Controls -->
    <div class="flex justify-center space-x-3 p-3">
      <PlayIcon class="" />
      <PauseIcon />
      <StopIcon />
    </div>
  </div>
</template>
