<script setup lang="ts">
import { useTracker } from "./composables/useTracker";
useTracker();
</script>

<template>
  <router-view />
</template>