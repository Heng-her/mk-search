<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const IndexComponent = defineAsyncComponent(() => import('./home/index.vue'));
</script>

<template>
  <IndexComponent />
</template>
