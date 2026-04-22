<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watchEffect } from 'vue';
import { countryCode, isLoadingGeo, fetchGeo } from '../composables/useGeo';

const UIs: Record<string, any> = {
  KH: defineAsyncComponent(() => import('./home/index.vue')), // Cambodia (Default)
  US: defineAsyncComponent(() => import('./home/us.vue')),    // USA
  VN: defineAsyncComponent(() => import('./home/vn.vue')),    // Vietnam
  CN: defineAsyncComponent(() => import('./home/zn.vue')),    // China
  EN: defineAsyncComponent(() => import('./home/en.vue')),    // English / Global
};

const activeComponent = shallowRef<any>(null);

// Trigger fetch
fetchGeo();

watchEffect(() => {
  if (!isLoadingGeo.value) {
    if (countryCode.value && UIs[countryCode.value]) {
      activeComponent.value = UIs[countryCode.value];
    } else {
      activeComponent.value = UIs['KH'];
    }
  }
});
</script>

<template>
  <div v-if="isLoadingGeo" class="min-h-screen flex items-center justify-center bg-[#09090b] text-white">
    <div class="flex flex-col items-center space-y-4">
      <div class="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-slate-400 font-semibold animate-pulse">Detecting your location...</p>
    </div>
  </div>

  <component v-else :is="activeComponent" />
</template>
