<template>
  <Swiper
    :modules="modules"
    :slides-per-view="1.2"
    :space-between="20"
    :pagination="{ clickable: true }"
  >
    <SwiperSlide v-for="project in projects" :key="project.title">
      <Motion
        :initial="{ opacity: 0, y: 50 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, easing: 'ease-out' }"
      >
        <div class="glass-card border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <!-- Semantic Figure for Image SEO -->
          <figure class="relative h-48 overflow-hidden m-0">
            <img
              :src="project.img"
              :alt="`Screenshot of ${project.title} - ${project.desc}`"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
            <figcaption class="sr-only">{{ project.title }}: {{ project.desc }}</figcaption>
          </figure>

          <!-- Content -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <h3 class="text-lg font-bold">{{ project.title }}</h3>
              <p class="text-slate-500 text-sm line-clamp-2">{{ project.desc }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in project.tags"
                  :key="tag"
                  class="px-2 py-1 rounded-md bg-purple-500/50 text-purple-200 text-[10px] font-bold uppercase"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-3 pt-2">
              <button
                @click="openLink(project.link)"
                class="flex-1 bg-linear-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg text-xs font-bold"
                :disabled="project.disabled"
              >
                {{ t('home.projects.demo') }}
              </button>
              <button class="flex-1 border border-white/10 py-2 rounded-lg text-xs font-bold">
                {{ t('home.projects.github') }}
              </button>
            </div>
          </div>
        </div>
      </Motion>
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Motion } from '@motionone/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from "swiper/modules";
import { useI18n } from '../composables/useI18n'

const { t } = useI18n();

interface Project {
  title: string
  desc: string
  img: string
  tags: string[]
  link?: string
  disabled?: boolean
}

const props = defineProps<{
  projects: Project[]
}>()

const modules = [Pagination]

function openLink(url?: string) {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.glass-card {
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease;
}
.glass-card:hover {
  transform: scale(1.03);
}
</style>