<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  type?: 'success' | 'error'
  title?: string
  message?: string
  confirmText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const closeModal = () => {
  isOpen.value = false
}

const handleConfirm = () => {
  emit('confirm')
  closeModal()
}

// Close on Escape key
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        @click.self="closeModal"
        @keydown="handleKeydown"
        tabindex="-1"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm focus:outline-none"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`modal-title-${type}`"
      >
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-4"
        >
          <div
            class="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 text-left shadow-2xl ring-1 ring-white/10"
          >
            <!-- Header / Icon -->
            <div class="px-6 pt-6">
              <div
                class="mx-auto flex size-14 items-center justify-center rounded-full"
                :class="type === 'success' 
                  ? 'bg-green-500/10 text-green-400' 
                  : 'bg-red-500/10 text-red-400'"
              >
                <svg
                  v-if="type === 'success'"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="size-7"
                >
                  <path
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <svg
                  v-else
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  class="size-7"
                >
                  <path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- Content -->
            <div class="px-6 pb-4 pt-2 text-center sm:text-left">
              <h3
                :id="`modal-title-${type}`"
                class="text-lg font-semibold text-white"
              >
                {{ title || (type === 'success' ? 'Message Sent!' : 'Something Went Wrong') }}
              </h3>
              <p class="mt-2 text-sm text-gray-400">
                {{ message }}
              </p>
            </div>

            <!-- Actions -->
            <div class="bg-gray-700/25 px-6 py-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                @click="handleConfirm"
                class="inline-flex w-full justify-center rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 sm:ml-3 sm:w-auto"
                :class="type === 'success'
                  ? 'bg-green-600 hover:bg-green-500 focus:ring-green-500'
                  : 'bg-red-600 hover:bg-red-500 focus:ring-red-500'"
              >
                {{ confirmText || 'OK' }}
              </button>
              <button
                type="button"
                @click="closeModal"
                class="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-white/30 sm:mt-0 sm:w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>