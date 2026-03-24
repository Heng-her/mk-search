<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean
  imageSrc: string
  title?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const closeModal = () => {
  isOpen.value = false
}

// Close on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        @click.self="closeModal"
      >
        <Transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-90 translate-y-8"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-90 translate-y-8"
        >
          <div
            class="relative max-w-2xl w-full overflow-hidden rounded-3xl bg-gray-900 shadow-2xl ring-1 ring-white/20"
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/60 hover:scale-110"
            >
              <i class="fa-solid fa-xmark text-xl"></i>
            </button>

            <!-- Image Container -->
            <div class="aspect-[3/4] sm:aspect-auto sm:max-h-[80vh] overflow-hidden">
              <img
                :src="imageSrc"
                :alt="title || 'Popup Image'"
                class="h-full w-full object-contain sm:object-cover"
              />
            </div>

            <!-- Optional Footer/Title -->
            <div v-if="title" class="p-6 text-center bg-linear-to-t from-black/80 to-transparent absolute bottom-0 left-0 right-0">
              <h3 class="text-xl font-bold text-white">{{ title }}</h3>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Any additional custom styles if needed */
</style>
