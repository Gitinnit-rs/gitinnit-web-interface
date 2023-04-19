<script lang="ts" setup></script>
<template>
  <section>
    <div class="hero py-10 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <img
            src="https://edm.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTc3Mzk2MzcxMzAzNzAzNzEz/martin-garrix-top-dj-2018.jpg"
            class="w-[20rem] h-[20rem] rounded-lg shadow-2xl object-cover"
            alt="Gitinnit User's Profile Image"
          />
          <div class="mt-6">
            <h1 class="text-4xl font-bold">Martin Garrix</h1>
            <p class="mt-1">Energy energy energy!</p>
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
