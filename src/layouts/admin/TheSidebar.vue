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
        App Menu
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
        to="/"
        class="nav-link flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 group"
      >
        <div class="flex-shrink-0"><i data-lucide="home" class="w-5 h-5"></i></div>
        <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]"
          >Dashboard</span
        >
        <span
          v-show="!isExpanded"
          class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
          >Dashboard</span
        >
      </router-link>

      <div class="nav-item-has-submenu">
        <button
          @click="toggleSubmenu('inventory')"
          class="nav-link flex items-center justify-between w-full p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200 group"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0"><i data-lucide="package" class="w-5 h-5"></i></div>
            <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]"
              >Inventory</span
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
            to="/inventory/current-stock"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
          >
            <span class="nav-link-text">Current Stock</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Current Stock</span
            >
          </router-link>
          <router-link
            to="/inventory/add-product"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
          >
            <span class="nav-link-text">Add New Product</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Add New Product</span
            >
          </router-link>
          <router-link
            to="/inventory/adjustments"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
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
        >
          <div class="flex items-center">
            <div class="flex-shrink-0"><i data-lucide="clipboard-list" class="w-5 h-5"></i></div>
            <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]"
              >Orders</span
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
            to="/orders/pending"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
          >
            <span class="nav-link-text">Pending Orders</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Pending Orders</span
            >
          </router-link>
          <router-link
            to="/orders/completed"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
          >
            <span class="nav-link-text">Completed Orders</span>
            <span
              v-show="!isExpanded"
              class="nav-link-tooltip absolute left-full ml-2 w-max px-3 py-1 bg-gray-800 text-white text-sm rounded-md shadow-lg"
              >Completed Orders</span
            >
          </router-link>
          <router-link
            to="/orders/new"
            class="nav-link flex items-center p-2 rounded-lg text-sm text-gray-200 hover:bg-indigo-600 transition-colors duration-200 group"
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
        to="/settings"
        class="nav-link flex items-center p-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 group"
      >
        <div class="flex-shrink-0"><i data-lucide="settings" class="w-5 h-5"></i></div>
        <span :class="['nav-link-text ml-3', { 'nav-link-text-collapsed': !isExpanded }]"
          >Settings</span
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
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router' // To handle router links

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

const openSubmenu = ref(null) // State to track which submenu is open

const toggleSubmenu = (menu) => {
  if (openSubmenu.value === menu) {
    openSubmenu.value = null // Close if already open
  } else {
    openSubmenu.value = menu // Open the clicked menu
  }
}

const closeSidebar = () => {
  emit('close-mobile-sidebar')
}

// Re-render Lucide icons if the sidebar state changes (e.g., expansion/collapse)
// or when a submenu opens/closes.
// This is a practical solution. For production, consider a Vue-native Lucide component.
watch(
  () => props.isExpanded,
  () => {
    if (typeof lucide !== 'undefined') {
      // A small delay to ensure transitions complete before re-rendering icons
      setTimeout(() => lucide.createIcons(), 300)
    }
  },
)

watch(openSubmenu, () => {
  if (typeof lucide !== 'undefined') {
    setTimeout(() => lucide.createIcons(), 50)
  }
})

// Initial icon rendering
onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})
</script>

<style scoped>
/* No specific scoped styles needed here, as global styles are in main.css
   and Tailwind classes handle most styling.
   If you had specific, highly component-isolated styles, they'd go here. */
</style>
