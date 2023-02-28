<script setup lang="ts">
const communityProjects = [
  {
    id: 0,
    name: "Summer Days",
    author: "Martin Garrix",
    image: randomImage(),
    genre: "Electro House",
    path: "",
    tags: [],
  },
  {
    id: 1,
    name: "In the name of the king",
    author: "King Krusher",
    image: randomImage(),
    genre: "Hip-Hop",
    path: "",
    tags: [],
  },
  {
    id: 2,
    name: "SkateLess",
    author: "Steve Aoki",
    image: randomImage(),
    genre: "Electronic",
    path: "",
    tags: [],
  },
  {
    id: 3,
    name: "Fireball",
    author: "Pitbull",
    image: randomImage(),
    genre: "Electronic",
    path: "",
    tags: [],
  },
];

function randomImage() {
  return `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/400/400`;
}
</script>
<template>
  <div>
    <!-- Hero Section -->
    <section class="hero p-5 bg-base-300">
      <div class="hero-content flex-col lg:flex-row space-x-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_Ufk5pON5I9UyQcWYdvFZj_dxZaDITOQ3w&usqp=CAU"
          class="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h1 class="text-5xl font-bold">New Releases</h1>
          <p class="py-6">Listen to the Top 10 new releases on Gitinnit</p>
          <button class="btn btn-primary">Get Started</button>
        </div>
      </div>
    </section>

    <section class="bg-base-100 p-10">
      <h1 class="uppercase tracking-widest text-xs text-gray-500">
        Community Projects
      </h1>
      <div class="-ml-3">
        <div class="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <ProjectCard
            :project="project"
            v-for="project in communityProjects.concat(communityProjects)"
            :key="project.name + project.author"
          />
        </div>
      </div>
    </section>
  </div>
</template>
