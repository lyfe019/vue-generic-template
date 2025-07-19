<template>
  <div class="carousel-container relative w-full overflow-hidden rounded-xl shadow-md">
    <div
      class="carousel-slides flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="carousel-slide min-w-full flex-shrink-0 relative overflow-hidden"
      >
        <!-- Default slot for custom slide content -->
        <slot :slide="slide" :index="index">
          <img :src="slide.src" :alt="slide.alt" class="w-full h-64 object-cover" />
          <div
            v-if="slide.text"
            class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
          >
            <p class="text-white text-center text-xl font-bold">{{ slide.text }}</p>
          </div>
        </slot>
      </div>
    </div>

    <!-- Navigation Arrows -->
    <template v-if="showArrows">
      <button
        class="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white z-10"
        aria-label="Previous slide"
        @click="goToPrevSlide"
      >
        <Icon name="chevron-left" class="w-6 h-6" />
      </button>
      <button
        class="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gray-800 bg-opacity-50 text-white rounded-full hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-white z-10"
        aria-label="Next slide"
        @click="goToNextSlide"
      >
        <Icon name="chevron-right" class="w-6 h-6" />
      </button>
    </template>

    <!-- Navigation Dots -->
    <div
      v-if="showDots && slides.length > 1"
      class="carousel-dots absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
    >
      <div
        v-for="(slide, index) in slides"
        :key="`dot-${index}`"
        :class="['carousel-dot', { active: index === currentIndex }]"
        @click="goToSlide(index)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon is available here

const props = defineProps({
  slides: {
    type: Array, // Array of { src: String, alt: String, text: String (optional) }
    required: true,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number, // in milliseconds
    default: 3000,
  },
  showDots: {
    type: Boolean,
    default: false,
  },
  showArrows: {
    type: Boolean,
    default: true,
  },
})

const currentIndex = ref(0)
let autoPlayInterval = null

const goToNextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % props.slides.length
  resetAutoPlay()
}

const goToPrevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length
  resetAutoPlay()
}

const goToSlide = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

const startAutoPlay = () => {
  if (props.autoPlay) {
    stopAutoPlay() // Clear any existing interval before starting a new one
    autoPlayInterval = setInterval(goToNextSlide, props.interval)
  }
}

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
  // Ensure Lucide icons are rendered for dynamically added components
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})

onUnmounted(() => {
  stopAutoPlay()
})

// Watch for changes in slides array or autoplay setting to restart/adjust carousel
watch([() => props.slides.length, () => props.autoPlay, () => props.interval], () => {
  currentIndex.value = 0 // Reset to first slide if slides change
  resetAutoPlay()
})
</script>

<style scoped>
/* Carousel specific styles (copied from your original HTML) */
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
}
.carousel-slides {
  display: flex;
  transition: transform 0.5s ease-in-out;
}
.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
  position: relative;
  overflow: hidden; /* Ensure image within doesn't overflow */
}
.carousel-slide img {
  width: 100%;
  height: 250px; /* Fixed height for consistency, adjust as needed */
  object-fit: cover;
}
.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 9999px; /* rounded-full */
  background-color: #d1d5db; /* gray-300 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.carousel-dot.active {
  background-color: #4f46e5; /* indigo-600 */
}
/* Ensure the no-scrollbar class from your HTML works */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
