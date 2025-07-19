<template>
  <div class="relative w-full h-full">
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
// It's important to import Chart from 'chart.js' directly in a Vue component
// when using a build setup, rather than relying on global CDN where possible.
// For Canvas/Immersive, we usually rely on the CDN being loaded in index.html.
// However, if using a bundler (Vite/Webpack), you would `npm install chart.js`
// and then `import { Chart, registerables } from 'chart.js'; Chart.register(...registerables);`
// For this environment, we assume Chart is globally available from the CDN.

const props = defineProps({
  chartId: {
    type: String,
    required: true,
  },
  chartType: {
    type: String,
    required: true, // e.g., 'bar', 'pie', 'line', 'doughnut'
  },
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    default: () => ({}),
  },
})

let chartInstance = null

const createChart = () => {
  const ctx = document.getElementById(props.chartId)
  if (ctx) {
    // Ensure the old chart instance is destroyed before creating a new one
    if (chartInstance) {
      chartInstance.destroy()
    }
    chartInstance = new Chart(ctx, {
      type: props.chartType,
      data: props.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...props.chartOptions, // Merge provided options
      },
    })
  } else {
    console.error(`Canvas element with ID '${props.chartId}' not found.`)
  }
}

onMounted(() => {
  // Delay chart creation slightly to ensure canvas element is fully rendered and sized
  // especially important when nested in other components or rendered conditionally.
  setTimeout(createChart, 50)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

// Watch for changes in chartData or chartOptions to update the chart
watch(
  () => props.chartData,
  (newVal, oldVal) => {
    if (chartInstance && newVal !== oldVal) {
      chartInstance.data = newVal
      chartInstance.update()
    }
  },
  { deep: true }, // Deep watch for nested data changes
)

watch(
  () => props.chartOptions,
  (newVal, oldVal) => {
    if (chartInstance && newVal !== oldVal) {
      chartInstance.options = {
        responsive: true,
        maintainAspectRatio: false,
        ...newVal,
      }
      chartInstance.update()
    }
  },
  { deep: true }, // Deep watch for nested options changes
)
</script>

<style scoped>
/* Ensure the canvas container fills its parent space */
div {
  width: 100%;
  height: 100%;
}
</style>
