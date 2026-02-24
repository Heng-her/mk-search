<script setup lang="ts">
import *as CollinsCarousel from "../components/CollinsCarousel.vue";
import { useProfileData } from "../data/profile";
// fetch("https://api.ipify.org?format=json")
//   .then((res) => res.json())
//   .then((data) => console.log(data.ip));
const { projects } = useProfileData();
const filteredProjects = projects.value.filter(p => p.link !== undefined);
</script>

<template>
  <div>
    <!-- <video autoplay loop muted class="">
      <source src="/video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video> -->
  </div>
  <CollinsCarousel :projects="filteredProjects" />
</template>
