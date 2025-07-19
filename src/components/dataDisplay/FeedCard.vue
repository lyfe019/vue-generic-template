<template>
  <div class="border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
    <img
      v-if="imageSrc"
      class="w-full h-40 object-cover"
      :src="imageSrc"
      :alt="imageAlt || title"
    />
    <div class="p-4">
      <h4 class="text-lg font-semibold text-gray-900 mb-2">{{ title }}</h4>
      <p class="text-sm text-gray-700 mb-3">{{ description }}</p>
      <div v-if="metadata.length" class="flex items-center text-xs text-gray-500 mb-2 flex-wrap">
        <template v-for="(meta, index) in metadata" :key="index">
          <div class="flex items-center mr-3 last:mr-0">
            <Icon v-if="meta.icon" :name="meta.icon" class="w-4 h-4 mr-1 flex-shrink-0" />
            <span>{{ meta.text }}</span>
          </div>
          <span v-if="index < metadata.length - 1" class="mx-1">&bull;</span>
        </template>
      </div>
      <a
        v-if="linkHref"
        :href="linkHref"
        :target="linkTarget"
        class="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
      >
        {{ linkText }} &rarr;
      </a>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@/components/common' // Assuming Icon is in common components

const props = defineProps({
  imageSrc: {
    type: String,
    default: null,
  },
  imageAlt: {
    type: String,
    default: 'Card Image',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  metadata: {
    type: Array, // [{ icon: String, text: String }]
    default: () => [],
  },
  linkHref: {
    type: String,
    default: null,
  },
  linkText: {
    type: String,
    default: 'Read More',
  },
  linkTarget: {
    type: String,
    default: '_self',
  },
})
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind classes are used directly. */
</style>
