<template>
  <div
    :class="[
      'data-table-container',
      { 'overflow-x-auto rounded-lg border border-gray-200': !isScrollableVariant },
    ]"
  >
    <!-- Optional: Fixed Header Container for scrollable tables -->
    <div
      v-if="isScrollableVariant"
      class="overflow-y-auto h-72 border border-gray-200 rounded-lg shadow-sm"
    >
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="`header-${index}`"
              scope="col"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                { 'cursor-pointer hover:bg-gray-100': header.sortable },
                header.class, // Allow custom classes for headers
              ]"
              @click="header.sortable && requestSort(header.value)"
            >
              <div
                class="flex items-center"
                :class="{
                  'justify-center': header.align === 'center',
                  'justify-end': header.align === 'right',
                }"
              >
                {{ header.text }}
                <Icon
                  v-if="header.sortable"
                  :name="getSortIcon(header.value)"
                  class="ml-1 w-4 h-4"
                  :class="{
                    'text-gray-600': sortKey === header.value,
                    'text-gray-400': sortKey !== header.value,
                  }"
                />
              </div>
            </th>
            <th v-if="hasActions" class="relative px-6 py-3">
              <span class="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(row, rowIndex) in paginatedData"
            :key="`row-${rowIndex}`"
            :class="{
              'odd:bg-white even:bg-gray-50': striped,
              'hover:bg-gray-100 transition-colors duration-150': hoverable || hasActions,
            }"
          >
            <td
              v-for="(header, colIndex) in headers"
              :key="`cell-${rowIndex}-${colIndex}`"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm',
                { 'font-medium text-gray-900': header.isPrimary }, // Apply primary style for first column/primary id
                header.class, // Allow custom classes for cells
              ]"
            >
              <!-- Custom slot for dynamic cell content (e.g., status badges, images) -->
              <slot :name="`item-${header.value}`" :item="row[header.value]" :row="row">
                <!-- Default rendering if no slot is provided -->
                {{ row[header.value] }}
              </slot>
            </td>
            <td
              v-if="hasActions"
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td
              :colspan="headers.length + (hasActions ? 1 : 0)"
              class="px-6 py-4 text-center text-gray-500"
            >
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Regular Table (not fixed header) -->
    <table v-else class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="(header, index) in headers"
            :key="`header-${index}`"
            scope="col"
            :class="[
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              { 'cursor-pointer hover:bg-gray-100': header.sortable },
              header.class,
            ]"
            @click="header.sortable && requestSort(header.value)"
          >
            <div
              class="flex items-center"
              :class="{
                'justify-center': header.align === 'center',
                'justify-end': header.align === 'right',
              }"
            >
              {{ header.text }}
              <Icon
                v-if="header.sortable"
                :name="getSortIcon(header.value)"
                class="ml-1 w-4 h-4"
                :class="{
                  'text-gray-600': sortKey === header.value,
                  'text-gray-400': sortKey !== header.value,
                }"
              />
            </div>
          </th>
          <th v-if="hasActions" class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, rowIndex) in paginatedData"
          :key="`row-${rowIndex}`"
          :class="{
            'odd:bg-white even:bg-gray-50': striped,
            'hover:bg-gray-100 transition-colors duration-150': hoverable || hasActions,
          }"
        >
          <td
            v-for="(header, colIndex) in headers"
            :key="`cell-${rowIndex}-${colIndex}`"
            :class="[
              'px-6 py-4 whitespace-nowrap text-sm',
              { 'font-medium text-gray-900': header.isPrimary },
              header.class,
            ]"
          >
            <slot :name="`item-${header.value}`" :item="row[header.value]" :row="row">
              {{ row[header.value] }}
            </slot>
          </td>
          <td v-if="hasActions" class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <slot name="actions" :row="row"></slot>
          </td>
        </tr>
        <tr v-if="paginatedData.length === 0">
          <td
            :colspan="headers.length + (hasActions ? 1 : 0)"
            class="px-6 py-4 text-center text-gray-500"
          >
            No data available.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls (Optional) -->
    <div
      v-if="paginate && data.length > itemsPerPage"
      class="mt-4 flex items-center justify-between"
    >
      <div class="text-sm text-gray-700">
        Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to
        <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, data.length) }}</span> of
        <span class="font-medium">{{ data.length }}</span> results
      </div>
      <nav class="flex" aria-label="Pagination">
        <ul class="flex items-center -space-x-px text-base h-10">
          <li>
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <Icon name="chevron-left" class="w-5 h-5" />
            </button>
          </li>
          <li v-for="page in totalPages" :key="page">
            <button
              @click="goToPage(page)"
              :class="[
                'flex items-center justify-center px-4 h-10 leading-tight border border-gray-300',
                currentPage === page
                  ? 'z-10 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 hover:text-indigo-700'
                  : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700',
              ]"
            >
              {{ page }}
            </button>
          </li>
          <li>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <Icon name="chevron-right" class="w-5 h-5" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@/components/common' // Assuming Icon is available

const props = defineProps({
  headers: {
    type: Array, // Array of { text: String, value: String, sortable?: Boolean, isPrimary?: Boolean, class?: String, align?: 'left' | 'center' | 'right' }
    required: true,
  },
  data: {
    type: Array, // Array of data objects, each corresponding to a row
    required: true,
  },
  striped: {
    type: Boolean,
    default: false,
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
  sortable: {
    // Global prop to enable/disable sorting for all columns that have sortable: true in their header definition
    type: Boolean,
    default: false,
  },
  initialSortKey: {
    type: String,
    default: null,
  },
  initialSortDirection: {
    type: String, // 'asc' or 'desc'
    default: 'asc',
  },
  scrollable: {
    // For variant 4: fixed header, scrollable body
    type: Boolean,
    default: false,
  },
  paginate: {
    // For variant 5: pagination enabled
    type: Boolean,
    default: false,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['sort', 'page-change'])

const sortKey = ref(props.initialSortKey)
const sortDirection = ref(props.initialSortDirection) // 'asc' or 'desc'
const currentPage = ref(1)

// Determine if actions slot is provided
const hasActions = computed(() => !!useSlots().actions)

// Determine if it's the scrollable variant, which has a different outer div structure
const isScrollableVariant = computed(() => props.scrollable)

// --- Sorting Logic ---
const sortedData = computed(() => {
  if (!props.sortable || !sortKey.value || !props.data) {
    return props.data
  }

  const dataCopy = [...props.data]
  return dataCopy.sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]

    // Handle null/undefined values by placing them at the end
    if (aValue == null && bValue == null) return 0
    if (aValue == null) return sortDirection.value === 'asc' ? 1 : -1
    if (bValue == null) return sortDirection.value === 'asc' ? -1 : 1

    // Numeric comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
    }

    // String comparison (case-insensitive)
    const strA = String(aValue).toLowerCase()
    const strB = String(bValue).toLowerCase()
    if (strA < strB) {
      return sortDirection.value === 'asc' ? -1 : 1
    }
    if (strA > strB) {
      return sortDirection.value === 'asc' ? 1 : -1
    }
    return 0
  })
})

const requestSort = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc' // Default to ascending when changing sort key
  }
  emit('sort', { key: sortKey.value, direction: sortDirection.value })
  currentPage.value = 1 // Reset to first page on sort
}

const getSortIcon = (key) => {
  if (sortKey.value !== key) {
    return 'arrow-down-up' // Default unsorted icon
  }
  return sortDirection.value === 'asc' ? 'arrow-down' : 'arrow-up'
}

// --- Pagination Logic ---
const totalPages = computed(() => {
  if (!props.paginate || props.itemsPerPage <= 0) return 1
  return Math.ceil(sortedData.value.length / props.itemsPerPage)
})

const paginatedData = computed(() => {
  if (!props.paginate) {
    return sortedData.value
  }
  const start = (currentPage.value - 1) * props.itemsPerPage
  const end = start + props.itemsPerPage
  return sortedData.value.slice(start, end)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit('page-change', currentPage.value)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    emit('page-change', currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    emit('page-change', currentPage.value)
  }
}

// Ensure Lucide icons are rendered after component updates
import { useSlots } from 'vue'

onMounted(() => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})

watch(
  [sortedData, currentPage],
  () => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  },
  { immediate: true },
) // Watch immediately and on changes
</script>

<style scoped>
/* No specific scoped styles needed beyond the component's internal logic,
   as Tailwind handles the provided classes and custom CSS variables for sliders
   were in the Audio/Video components, not relevant here. */
</style>
