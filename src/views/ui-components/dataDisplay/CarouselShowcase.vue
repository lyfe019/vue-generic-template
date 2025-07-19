<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Carousel/Slider Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Basic Carousel with Arrows -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Product Carousel</h3>
        <Carousel
          :slides="productSlides"
          :show-autoplay="false"
          :show-dots="false"
          :show-arrows="true"
        />
      </section>

      <!-- Variant 2: Carousel with Dots & Auto-play -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Promotional Carousel (Auto-play & Dots)
        </h3>
        <Carousel
          :slides="promoSlides"
          :auto-play="true"
          :interval="4000"
          :show-dots="true"
          :show-arrows="true"
        >
          <!-- Using default slot for custom text overlay as per your original HTML -->
          <template #default="{ slide }">
            <img :src="slide.src" :alt="slide.alt" class="w-full h-64 object-cover" />
            <div
              v-if="slide.text"
              class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"
            >
              <p class="text-white text-center text-xl font-bold">{{ slide.text }}</p>
            </div>
          </template>
        </Carousel>
      </section>

      <!-- Variant 3: Card Carousel (Scrollable - uses native CSS scroll-snap) -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Team Members Spotlight (Horizontal Scroll)
        </h3>
        <div class="relative">
          <div class="flex overflow-x-auto snap-x snap-mandatory pb-4 space-x-4 no-scrollbar">
            <!-- Card 1 -->
            <div
              class="flex-shrink-0 w-64 md:w-72 snap-center bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm"
            >
              <img
                src="https://placehold.co/100x100/A0AEC0/ffffff?text=Sarah"
                alt="Sarah Johnson"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
              <h4 class="text-lg font-semibold text-gray-800">Sarah Johnson</h4>
              <p class="text-sm text-gray-600 mb-2">Head Chef</p>
              <p class="text-xs text-gray-500">"Passionate about culinary innovation."</p>
            </div>
            <!-- Card 2 -->
            <div
              class="flex-shrink-0 w-64 md:w-72 snap-center bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm"
            >
              <img
                src="https://placehold.co/100x100/FBD38D/000000?text=David"
                alt="David Lee"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
              <h4 class="text-lg font-semibold text-gray-800">David Lee</h4>
              <p class="text-sm text-gray-600 mb-2">Operations Manager</p>
              <p class="text-xs text-gray-500">"Ensuring smooth daily operations."</p>
            </div>
            <!-- Card 3 -->
            <div
              class="flex-shrink-0 w-64 md:w-72 snap-center bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm"
            >
              <img
                src="https://placehold.co/100x100/9F7AEA/ffffff?text=Emily"
                alt="Emily White"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
              <h4 class="text-lg font-semibold text-gray-800">Emily White</h4>
              <p class="text-sm text-gray-600 mb-2">Marketing Lead</p>
              <p class="text-xs text-gray-500">"Bringing our flavors to the world."</p>
            </div>
            <!-- Card 4 -->
            <div
              class="flex-shrink-0 w-64 md:w-72 snap-center bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm"
            >
              <img
                src="https://placehold.co/100x100/63B3ED/ffffff?text=Chris"
                alt="Chris Green"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
              <h4 class="text-lg font-semibold text-gray-800">Chris Green</h4>
              <p class="text-sm text-gray-600 mb-2">Customer Relations</p>
              <p class="text-xs text-gray-500">"Dedicated to customer satisfaction."</p>
            </div>
            <!-- Card 5 -->
            <div
              class="flex-shrink-0 w-64 md:w-72 snap-center bg-gray-50 border border-gray-200 rounded-lg p-4 text-center shadow-sm"
            >
              <img
                src="https://placehold.co/100x100/B2F5EA/000000?text=Olivia"
                alt="Olivia Chen"
                class="w-24 h-24 rounded-full object-cover mx-auto mb-3"
              />
              <h4 class="text-lg font-semibold text-gray-800">Olivia Chen</h4>
              <p class="text-sm text-gray-600 mb-2">Quality Control</p>
              <p class="text-xs text-gray-500">"Ensuring every dish is perfect."</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 text-center mt-3">
            Scroll horizontally to view more team members.
          </p>
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;Carousel&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;Carousel&gt;</code> component provides a dynamic and interactive way to
          display a collection of images or content in a rotating sequence. It supports navigation
          arrows, pagination dots, and optional auto-play functionality.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>slides</code> (Array, required): An array of objects, where each object represents
            a slide. Each slide object should ideally have `src` (String) and `alt` (String)
            properties. An optional `text` (String) property can be included for overlay content
            when using the default slot.
            <pre class="bg-gray-100 p-2 rounded text-sm mt-1"><code>slides: [
  &lbrace;&lbrace; src: 'image1.jpg', alt: 'Description 1' &rbrace;&rbrace;,
  &lbrace;&lbrace; src: 'image2.jpg', alt: 'Description 2', text: 'Overlay Text' &rbrace;&rbrace;
]</code></pre>
          </li>
          <li>
            <code>autoPlay</code> (Boolean, default: <code>false</code>): If <code>true</code>, the
            carousel will automatically advance slides.
          </li>
          <li>
            <code>interval</code> (Number, default: <code>3000</code>): The duration (in
            milliseconds) between automatic slide transitions when `autoPlay` is `true`.
          </li>
          <li>
            <code>showDots</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            navigation dots will be displayed at the bottom of the carousel.
          </li>
          <li>
            <code>showArrows</code> (Boolean, default: <code>true</code>): If <code>true</code>,
            navigation arrows (previous/next) will be displayed on the sides of the carousel.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            **Default Slot**: Allows for highly customizable slide content. When using this slot,
            the component passes `slide` (the current slide object) and `index` (the current slide's
            index) as slot props, allowing you to build complex slide layouts. If you don't use this
            slot, the component will render a basic `&lt;img&gt;` tag using `slide.src` and
            `slide.alt`, and an optional text overlay if `slide.text` is provided.
            <pre
              class="bg-gray-100 p-2 rounded text-sm mt-1"
            ><code>&lt;Carousel :slides="mySlides"&gt;
  &lt;template #default="{ slide, index }"&gt;
    &lt;!-- Custom content for each slide --&gt;
    &lt;img :src="slide.src" :alt="slide.alt" class="w-full h-full object-cover" /&gt;
    &lt;div class="absolute bottom-0 p-4 bg-gradient-to-t from-black to-transparent w-full text-white"&gt;
      &lt;h4&gt;&lbrace;&lbrace; slide.title || 'Slide Title' &rbrace;&rbrace;&lt;/h4&gt;
      &lt;p&gt;&lbrace;&lbrace; slide.description || 'Slide description here.' &rbrace;&rbrace;&lt;/p&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Carousel&gt;</code></pre>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Basic Carousel with Arrows (no auto-play, no dots) --&gt;
  &lt;Carousel
    :slides="productSlides"
    :show-autoplay="false"
    :show-dots="false"
    :show-arrows="true"
  /&gt;

  &lt;!-- Auto-playing Carousel with Dots --&gt;
  &lt;Carousel
    :slides="promoSlides"
    :auto-play="true"
    :interval="5000"
    :show-dots="true"
    :show-arrows="true"
  &gt;
    &lt;!-- Custom content for promotional slides --&gt;
    &lt;template #default="{ slide }"&gt;
      &lt;img :src="slide.src" :alt="slide.alt" class="w-full h-64 object-cover" /&gt;
      &lt;div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4"&gt;
        &lt;p class="text-white text-center text-xl font-bold"&gt;&lbrace;&lbrace; slide.text &rbrace;&rbrace;&lt;/p&gt;
      &lt;/div&gt;
    &lt;/template&gt;
  &lt;/Carousel&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { reactive } from 'vue';
import { Carousel } from '@/components/dataDisplay';

const productSlides = reactive([
  &lbrace;&lbrace; src: 'path/to/burger.jpg', alt: 'Delicious Burger' &rbrace;&rbrace;,
  &lbrace;&lbrace; src: 'path/to/fries.jpg', alt: 'Crispy Fries' &rbrace;&rbrace;,
]);

const promoSlides = reactive([
  &lbrace;&lbrace; src: 'path/to/promo1.jpg', alt: 'New Offers', text: 'Exclusive Discounts This Week!' &rbrace;&rbrace;,
  &lbrace;&lbrace; src: 'path/to/promo2.jpg', alt: 'Chef Special', text: 'Try Our Chef\\'s Special!' &rbrace;&rbrace;,
]);
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Carousel } from '@/components/dataDisplay'

const productSlides = reactive([
  { src: 'https://placehold.co/800x250/FFE0B2/000?text=Delicious+Burger', alt: 'Delicious Burger' },
  { src: 'https://placehold.co/800x250/E6EE9C/000?text=Crispy+Fries', alt: 'Crispy Fries' },
  { src: 'https://placehold.co/800x250/BBDEFB/000?text=Cool+Drink', alt: 'Cool Drink' },
])

const promoSlides = reactive([
  {
    src: 'https://placehold.co/800x250/FFCDD2/000?text=New+Menu+Items',
    alt: 'New Menu Items',
    text: 'Discover Our Latest Additions!',
  },
  {
    src: 'https://placehold.co/800x250/DCEDC8/000?text=Limited+Time+Offer',
    alt: 'Limited Time Offer',
    text: "Don't Miss Our Special Deals!",
  },
  {
    src: 'https://placehold.co/800x250/BBDEFB/000?text=Customer+Favorites',
    alt: 'Customer Favorites',
    text: 'Our Top Rated Dishes!',
  },
])
</script>

<style scoped>
/*
  The `no-scrollbar` class is a utility to hide scrollbars.
  It's included in the <style> tag of Carousel.vue for now,
  but could also be global or in a dedicated utility CSS file.
*/
</style>
