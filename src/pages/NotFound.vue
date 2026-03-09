<script setup>
import { Motion } from "@motionone/vue"
</script>

<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8">
    <Motion 
      :initial="{ opacity: 0, y: 20 }" 
      :animate="{ opacity: 1, y: 0 }" 
      :transition="{ duration: 0.5 }"
    >
      <p class="text-base font-semibold text-blue-600">404</p>
      <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Page not found
      </h1>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
      </p>
      
      <div class="mt-10 flex items-center justify-center gap-x-6">
        <router-link
          to="/"
          class="rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          Go back home
        </router-link>
        
        <router-link 
          to="/about" 
          class="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          Contact support <span aria-hidden="true">&rarr;</span>
        </router-link>
      </div>
    </Motion>
  </div>
</template>