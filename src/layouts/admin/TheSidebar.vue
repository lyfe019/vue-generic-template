<template>
  <aside
    id="sidebar"
    :class="[
      'sidebar bg-indigo-800 text-white p-4 flex flex-col rounded-r-lg shadow-lg fixed md:relative inset-y-0 left-0 z-50',
      isExpanded ? 'sidebar-expanded' : 'sidebar-collapsed',
      isMobile && !isExpanded ? 'mobile-hidden' : '',
    ]"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 id="sidebar-title" :class="['text-2xl font-bold truncate', { hidden: !isExpanded }]">
        WeNext Academy
      </h1>
      <button
        v-if="isMobile"
        @click="closeSidebar"
        class="md:hidden p-2 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Close sidebar"
      >
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>

    <nav class="flex-1 space-y-2">
      <router-link
        to="/admin"
        class="nav-link flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 group w-full"
        active-class="bg-indigo-700"
      >
        <div class="flex-shrink-0"><i data-lucide="home" class="w-5 h-5"></i></div>
        <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]">
          Dashboard</span
        >
        <span
          v-show="!isExpanded"
          class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
          >Dashboard</span
        >
      </router-link>

      <div class="nav-item-has-submenu">
        <button
          @click="toggleSubmenu('components')"
          class="nav-link flex items-center justify-between w-full p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 group"
          :class="{ 'bg-indigo-700': openSubmenu && openSubmenu.startsWith('components') }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0"><i data-lucide="blocks" class="w-5 h-5"></i></div>
            <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]">
              Components</span
            >
          </div>
          <i
            data-lucide="chevron-right"
            :class="[
              'sub-menu-chevron w-5 h-5 text-gray-300 transition-transform duration-200 flex-shrink-0',
              { rotate: openSubmenu && openSubmenu.startsWith('components') },
            ]"
          ></i>
          <span
            v-show="!isExpanded"
            class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
            >Components</span
          >
        </button>
        <div
          :class="[
            'sub-menu pl-8 space-y-2',
            { open: openSubmenu && openSubmenu.startsWith('components') },
          ]"
        >
          <div
            v-for="(group, groupIndex) in componentGroups"
            :key="`comp-group-${groupIndex}`"
            class="nav-item-has-submenu"
          >
            <button
              @click="toggleSubmenu(`components-group-${groupIndex}`)"
              class="nav-link flex items-center justify-between w-full p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
              :class="{ 'bg-indigo-600': openSubmenu === `components-group-${groupIndex}` }"
            >
              <span :class="['nav-link-text', { 'nav-link-text-collapsed': !isExpanded }]">{{
                group.name
              }}</span>
              <i
                data-lucide="chevron-right"
                :class="[
                  'sub-menu-chevron w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0',
                  { rotate: openSubmenu === `components-group-${groupIndex}` },
                ]"
              ></i>
              <span
                v-show="!isExpanded"
                class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
                >{{ group.name }}</span
              >
            </button>
            <div
              :class="[
                'sub-menu pl-4 space-y-2',
                { open: openSubmenu === `components-group-${groupIndex}` },
              ]"
            >
              <router-link
                v-for="(comp, compIndex) in group.components"
                :key="`comp-${groupIndex}-${compIndex}`"
                :to="comp.route"
                class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-300 hover:bg-indigo-500 transition-colors duration-200 group w-full"
                active-class="bg-indigo-500"
              >
                <div class="flex-shrink-0" v-if="comp.icon">
                  <i :data-lucide="comp.icon" class="w-4 h-4 mr-2"></i>
                </div>
                <span :class="['nav-link-text', { 'nav-link-text-collapsed': !isExpanded }]">{{
                  comp.name
                }}</span>
                <span
                  v-show="!isExpanded"
                  class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
                  >{{ comp.name }}</span
                >
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-item-has-submenu">
        <button
          @click="toggleSubmenu('inventory')"
          class="nav-link flex items-center justify-between w-full p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 group"
          :class="{ 'bg-indigo-700': openSubmenu === 'inventory' }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0"><i data-lucide="package" class="w-5 h-5"></i></div>
            <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]">
              Inventory</span
            >
          </div>
          <i
            data-lucide="chevron-right"
            :class="[
              'sub-menu-chevron w-5 h-5 text-gray-300 transition-transform duration-200 flex-shrink-0',
              { rotate: openSubmenu === 'inventory' },
            ]"
          ></i>
          <span
            v-show="!isExpanded"
            class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
            >Inventory</span
          >
        </button>
        <div :class="['sub-menu pl-8 space-y-2', { open: openSubmenu === 'inventory' }]">
          <router-link
            to="/admin/inventory/current-stock"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">Current Stock</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Current Stock</span
            >
          </router-link>
          <router-link
            to="/admin/inventory/add-product"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">Add New Product</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Add New Product</span
            >
          </router-link>
          <router-link
            to="/admin/inventory/adjustments"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">Stock Adjustments</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Stock Adjustments</span
            >
          </router-link>
        </div>
      </div>

      <div class="nav-item-has-submenu">
        <button
          @click="toggleSubmenu('orders')"
          class="nav-link flex items-center justify-between w-full p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 group"
          :class="{ 'bg-indigo-700': openSubmenu === 'orders' }"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0"><i data-lucide="clipboard-list" class="w-5 h-5"></i></div>
            <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]">
              Orders</span
            >
          </div>
          <i
            data-lucide="chevron-right"
            :class="[
              'sub-menu-chevron w-5 h-5 text-gray-300 transition-transform duration-200 flex-shrink-0',
              { rotate: openSubmenu === 'orders' },
            ]"
          ></i>
          <span
            v-show="!isExpanded"
            class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
            >Orders</span
          >
        </button>
        <div :class="['sub-menu pl-8 space-y-2', { open: openSubmenu === 'orders' }]">
          <router-link
            to="/admin/orders/pending"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">Pending Orders</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Pending Orders</span
            >
          </router-link>
          <router-link
            to="/admin/orders/completed"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">Completed Orders</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Completed Orders</span
            >
          </router-link>
          <router-link
            to="/admin/orders/new"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group w-full"
            active-class="bg-indigo-600"
          >
            <span class="nav-link-text">New Order</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >New Order</span
            >
          </router-link>
        </div>
      </div>

      <router-link
        to="/admin/settings"
        class="nav-link flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 group w-full"
        active-class="bg-indigo-700"
      >
        <div class="flex-shrink-0"><i data-lucide="settings" class="w-5 h-5"></i></div>
        <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]">
          Settings</span
        >
        <span
          v-show="!isExpanded"
          class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
          >Settings</span
        >
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  isExpanded: {
    type: Boolean,
    default: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:isExpanded', 'close-mobile-sidebar'])

const openSubmenu = ref(null)

const componentGroups = ref([
  {
    name: 'Common',
    icon: 'component',
    components: [
      { name: 'Accordion Group', route: '/admin/components/common/accordion-group', icon: 'list' },
      { name: 'Accordion Item', route: '/admin/components/common/accordion-item', icon: 'list' },
      { name: 'Avatar', route: '/admin/components/common/avatar', icon: 'circle-user' },
      { name: 'Badge', route: '/admin/components/common/badge', icon: 'badge' },
      { name: 'Button', route: '/admin/components/common/buttons', icon: 'mouse-pointer' },
      { name: 'Button Group', route: '/admin/components/common/button-group', icon: 'boxes' },
      { name: 'Icon', route: '/admin/components/common/icons', icon: 'sparkles' },
      { name: 'Link', route: '/admin/components/common/link', icon: 'link' },
      {
        name: 'Notification Badge',
        route: '/admin/components/common/notification-badge',
        icon: 'bell',
      },
    ],
  },
  {
    name: 'Data Display',
    icon: 'layout-dashboard',
    components: [
      { name: 'Card', route: '/admin/components/dataDisplay/cards', icon: 'square' },
      { name: 'Carousel', route: '/admin/components/dataDisplay/carousel', icon: 'image' },
      {
        name: 'Chart Component',
        route: '/admin/components/data-display/chart-component',
        icon: 'bar-chart',
      },
      {
        name: 'Comment Item',
        route: '/admin/components/data-display/comment-item',
        icon: 'message-circle',
      },
      {
        name: 'Comment Section',
        route: '/admin/components/data-display/comment-section',
        icon: 'messages-square',
      },
      { name: 'Data Table', route: '/admin/components/data-display/data-table', icon: 'table' },
      { name: 'Feed Card', route: '/admin/components/data-display/feed-card', icon: 'rss' },
      { name: 'Feed Item', route: '/admin/components/data-display/feed-item', icon: 'rss' },
    ],
  },
  {
    name: 'Feedback',
    icon: 'message-square',
    components: [
      {
        name: 'Confirmation Dialog',
        route: '/admin/components/feedback/confirmation-dialogs',
        icon: 'check-circle',
      },
      { name: 'Toast', route: '/admin/components/feedback/toasts', icon: 'bell-ring' },
      {
        name: 'Toast Container',
        route: '/admin/components/feedback/toast-container',
        icon: 'bell',
      },
      { name: 'Tooltip', route: '/admin/components/feedback/tooltip', icon: 'info' },
      { name: 'Alert', route: '/admin/components/feedback/alerts', icon: 'alert-circle' },
      {
        name: 'Validation Message',
        route: '/admin/components/feedback/validation-messages',
        icon: 'circle-exclamation',
      },
    ],
  },
  {
    name: 'Forms',
    icon: 'form-input',
    components: [
      {
        name: 'Quantity Stepper',
        route: '/admin/components/forms/quantity-stepper',
        icon: 'plus-minus',
      },
      { name: 'Range Slider', route: '/admin/components/forms/range-slider', icon: 'sliders' },
      {
        name: 'Rich Text Editor',
        route: '/admin/components/forms/rich-text-editor',
        icon: 'edit',
      },
      { name: 'Date Picker', route: '/admin/components/forms/date-picker', icon: 'calendar-days' },
      { name: 'File Uploader', route: '/admin/components/forms/file-uploader', icon: 'upload' },
      {
        name: 'Selection Control',
        route: '/admin/components/forms/selection-control',
        icon: 'check-square',
      },
      { name: 'Text Input', route: '/admin/components/forms/text-input', icon: 'text-select' },
      {
        name: 'Toggle Switch',
        route: '/admin/components/forms/toggle-switch',
        icon: 'toggle-right',
      },
    ],
  },
  {
    name: 'Loading Indicators',
    icon: 'loader-circle',
    components: [
      { name: 'Spinner', route: '/admin/components/loading-indicators/spinner', icon: 'loader' },
      {
        name: 'Loading Spinner',
        route: '/admin/components/loading-indicators/loading-spinner',
        icon: 'loader-2',
      },
      {
        name: 'Progress Bar',
        route: '/admin/components/loading-indicators/progress-bar',
        icon: 'loading',
      },
    ],
  },
  {
    name: 'Media',
    icon: 'image-stack',
    components: [
      { name: 'Audio Player', route: '/admin/components/media/audio-player', icon: 'volume-2' },
      { name: 'Image Display', route: '/admin/components/media/image-display', icon: 'image' },
      { name: 'Video Player', route: '/admin/components/media/video-player', icon: 'video' },
    ],
  },
  {
    name: 'Modal',
    icon: 'popover',
    components: [
      {
        name: 'Modal',
        route: '/admin/components/modal/modal',
        icon: 'boxes',
      },
    ],
  },
  {
    name: 'Navigation',
    icon: 'menu',
    components: [
      {
        name: 'Bottom Navigation Bar',
        route: '/admin/components/navigation/bottom-navigation-bar',
        icon: 'grip',
      },
      {
        name: 'Mobile Hamburger Menu',
        route: '/admin/components/navigation/mobile-hamburger-menu',
        icon: 'menu',
      },
      { name: 'Tabs', route: '/admin/components/navigation/tabs', icon: 'box' },
      {
        name: 'Top Navigation Bar',
        route: '/admin/components/navigation/top-navigation-bar',
        icon: 'panel-top',
      },
      {
        name: 'Breadcrumb',
        route: '/admin/components/navigation/breadcrumb',
        icon: 'chevrons-right',
      },
      { name: 'Pagination', route: '/admin/components/navigation/pagination', icon: 'file-text' },
      {
        name: 'Scroll To Top Button',
        route: '/admin/components/navigation/scroll-to-top-button',
        icon: 'arrow-up',
      },
    ],
  },
  {
    name: 'Code & Content',
    icon: 'code-square',
    components: [
      {
        name: 'Code Editor',
        route: '/admin/components/code-and-content/code-editor',
        icon: 'terminal',
      },
      {
        name: 'Code Snippet',
        route: '/admin/components/code-and-content/code-snippet',
        icon: 'code',
      },
    ],
  },
  // Removed 'Admin Specific' as it was empty and not listed in the new categorization
])

const toggleSubmenu = (menu) => {
  if (openSubmenu.value === menu) {
    if (menu.startsWith('components-group-')) {
      openSubmenu.value = 'components'
    } else if (menu === 'components') {
      openSubmenu.value = null
    } else {
      openSubmenu.value = null
    }
  } else {
    openSubmenu.value = menu
  }
}

const closeSidebar = () => {
  emit('close-mobile-sidebar')
}

watch(
  () => props.isExpanded,
  () => {
    if (typeof lucide !== 'undefined') {
      setTimeout(() => lucide.createIcons(), 300)
    }
  },
)

watch(openSubmenu, () => {
  if (typeof lucide !== 'undefined') {
    setTimeout(() => lucide.createIcons(), 50)
  }
})

onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>

<style scoped>
/* Base styles for the sidebar */
.sidebar {
  transition:
    width 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden; /* Important for hiding content when collapsed */
}

/* State when sidebar is fully expanded (both desktop and mobile when visible) */
.sidebar-expanded {
  width: 16rem; /* Full width */
  transform: translateX(0); /* Fully visible */
}

/* Default state when sidebar is collapsed.
    This class primarily handles the width reduction for desktop.
    On mobile, it will be overridden by .mobile-hidden for its transform. */
.sidebar-collapsed {
  width: 16rem; /* Default to full width for mobile to enable proper slide from 16rem */
  transform: translateX(0); /* Default to visible for mobile */
}

/* This is the key for mobile hidden state: pushes it completely off-screen */
.mobile-hidden {
  transform: translateX(
    -100%
  ) !important; /* Forces it off-screen, overrides sidebar-collapsed's transform */
  width: 16rem; /* Ensure it transitions from its full width */
}

/* Media queries for desktop behavior (md and up) */
@media (min-width: 768px) {
  .sidebar {
    /* On medium screens and up, override mobile 'fixed' to 'relative' as per Tailwind's md:relative */
    position: relative;
    transform: translateX(0) !important; /* Ensure it's always on screen for desktop */
  }

  .sidebar-expanded {
    width: 16rem; /* Expanded width on desktop */
  }

  .sidebar-collapsed {
    width: 5rem; /* Collapsed width on desktop */
    transform: translateX(0) !important; /* Ensure it stays on screen when collapsed on desktop */
  }

  /* NEW: Adjust styling for nav-links when sidebar is collapsed on desktop */
  .sidebar-collapsed .nav-link {
    justify-content: center; /* Center content (icon) horizontally */
    padding: 0.75rem 0; /* Adjust padding to make it centered vertically and remove horizontal padding for a snug fit */
  }

  /* Ensure mobile-hidden's transform doesn't apply on desktop */
  .mobile-hidden {
    transform: translateX(0) !important; /* Override mobile-hidden transform on desktop */
    width: auto !important; /* Let desktop width rules apply */
  }
}

/* Common navigation link styles */
.nav-link {
  width: 100%; /* Ensure all nav links take full available width */
}

.nav-link-text {
  white-space: nowrap;
  overflow: hidden;
  transition:
    opacity 0.3s ease-in-out,
    max-width 0.3s ease-in-out;
}
.nav-link-text-collapsed {
  opacity: 0;
  max-width: 0;
  pointer-events: none;
}
.nav-link-tooltip {
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  pointer-events: none; /* Prevents interaction when hidden */
}
.group:hover .nav-link-tooltip {
  opacity: 1;
}

/* Sub-menu specific styles */
.sub-menu {
  transition:
    max-height 0.3s ease-out,
    opacity 0.3s ease-out,
    padding-top 0.3s ease-out;
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding-top: 0; /* Initially no padding */
}
.sub-menu.open {
  max-height: 500px; /* Sufficiently large to contain content */
  opacity: 1;
  padding-top: 0.5rem; /* pt-2 equivalent */
}
.sub-menu-chevron {
  transition: transform 0.2s ease-in-out;
}
.sub-menu-chevron.rotate {
  transform: rotate(90deg);
}
</style>
