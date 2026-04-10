<script setup lang="ts">
import CollinsCarousel from "../components/CollinsCarousel.vue";
import { useProfileData } from "../data/profile";
import { useHead } from "@vueuse/head";

useHead({
  title: "About Her Bunheng | Experience & Vision",
  meta: [
    {
      name: "description",
      content: "Learn more about Her Bunheng, a dedicated developer from Cambodia. Discover my journey, values, and the expertise I bring to every project.",
    },
  ],
});

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
