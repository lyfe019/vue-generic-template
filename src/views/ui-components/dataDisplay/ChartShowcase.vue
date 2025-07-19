<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Chart / Graph Components</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Variant 1: Bar Chart (Sales by Month) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Monthly Sales Overview</h3>
        <div class="relative h-64">
          <ChartComponent
            chartId="monthlySalesChart"
            chartType="bar"
            :chartData="monthlySalesData"
            :chartOptions="monthlySalesOptions"
          />
        </div>
      </section>

      <!-- Variant 2: Pie Chart (Product Categories) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Product Category Distribution</h3>
        <div class="relative h-64 flex items-center justify-center">
          <ChartComponent
            chartId="categoryDistributionChart"
            chartType="doughnut"
            :chartData="categoryDistributionData"
            :chartOptions="categoryDistributionOptions"
          />
        </div>
      </section>

      <!-- Variant 3: Line Graph (Customer Growth) -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          New Customer Sign-ups (Last 6 Months)
        </h3>
        <div class="relative h-80">
          <ChartComponent
            chartId="customerGrowthChart"
            chartType="line"
            :chartData="customerGrowthData"
            :chartOptions="customerGrowthOptions"
          />
        </div>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;ChartComponent&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;ChartComponent&gt;</code> is a wrapper around Chart.js, allowing you to
          easily render various types of charts by passing data and configuration options.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>chartId</code> (String, required): A unique ID for the canvas element where the
            chart will be drawn.
          </li>
          <li>
            <code>chartType</code> (String, required): The type of chart to render (e.g., 'bar',
            'pie', 'line', 'doughnut'). Corresponds to Chart.js types.
          </li>
          <li>
            <code>chartData</code> (Object, required): The data object for the chart, structured
            according to Chart.js documentation. This includes `labels` and `datasets`.
            <pre class="bg-gray-100 p-2 rounded text-sm mt-1"><code>&lbrace;&lbrace;
  labels: ['Label A', 'Label B'],
  datasets: [{
    label: 'My Dataset',
    data: [10, 20],
    backgroundColor: ['red', 'blue']
  }]
&rbrace;&rbrace;</code></pre>
          </li>
          <li>
            <code>chartOptions</code> (Object, default: <code>{}</code>): An object containing the
            configuration options for the chart, structured according to Chart.js documentation.
            This can include `responsive`, `plugins`, `scales`, etc.
            <pre class="bg-gray-100 p-2 rounded text-sm mt-1"><code>&lbrace;&lbrace;
  responsive: true,
  maintainAspectRatio: false,
  plugins: &lbrace;&lbrace; legend: &lbrace;&lbrace; display: true &rbrace;&rbrace; &rbrace;&rbrace;,
  scales: &lbrace;&lbrace;
    y: &lbrace;&lbrace; beginAtZero: true &rbrace;&rbrace;
  &rbrace;&rbrace;
&rbrace;&rbrace;</code></pre>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;div class="relative h-64"&gt;
    &lt;!-- Bar Chart Example --&gt;
    &lt;ChartComponent
      chartId="myBarChart"
      chartType="bar"
      :chartData="myBarChartData"
      :chartOptions="myBarChartOptions"
    /&gt;
  &lt;/div&gt;

  &lt;div class="relative h-64"&gt;
    &lt;!-- Doughnut Chart Example --&gt;
    &lt;ChartComponent
      chartId="myDoughnutChart"
      chartType="doughnut"
      :chartData="myDoughnutChartData"
      :chartOptions="myDoughnutChartOptions"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { reactive } from 'vue';
import { ChartComponent } from '@/components/dataDisplay';

const myBarChartData = reactive(&lbrace;&lbrace;
  labels: ['January', 'February', 'March'],
  datasets: [&lbrace;&lbrace;
    label: 'Sales',
    data: [65, 59, 80],
    backgroundColor: 'rgba(75, 192, 192, 0.6)',
  &rbrace;&rbrace;]
&rbrace;&rbrace;);

const myBarChartOptions = reactive(&lbrace;&lbrace;
  plugins: &lbrace;&lbrace; legend: &lbrace;&lbrace; display: false &rbrace;&rbrace; &rbrace;&rbrace;,
  scales: &lbrace;&lbrace; y: &lbrace;&lbrace; beginAtZero: true &rbrace;&rbrace; &rbrace;&rbrace;
&rbrace;&rbrace;);

const myDoughnutChartData = reactive(&lbrace;&lbrace;
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [&lbrace;&lbrace;
    data: [300, 50, 100],
    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
  &rbrace;&rbrace;]
&rbrace;&rbrace;);

const myDoughnutChartOptions = reactive(&lbrace;&lbrace;
  plugins: &lbrace;&lbrace; legend: &lbrace;&lbrace; position: 'right' &rbrace;&rbrace; &rbrace;&rbrace;
&rbrace;&rbrace;);
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ChartComponent } from '@/components/dataDisplay'

// Data for Bar Chart
const monthlySalesData = reactive({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales ($)',
      data: [12000, 19000, 15000, 22000, 18000, 25000],
      backgroundColor: [
        'rgba(79, 70, 229, 0.6)', // indigo-600
        'rgba(99, 102, 241, 0.6)', // indigo-500
        'rgba(129, 140, 248, 0.6)', // indigo-400
        'rgba(79, 70, 229, 0.6)',
        'rgba(99, 102, 241, 0.6)',
        'rgba(129, 140, 248, 0.6)',
      ],
      borderColor: [
        'rgba(79, 70, 229, 1)',
        'rgba(99, 102, 241, 1)',
        'rgba(129, 140, 248, 1)',
        'rgba(79, 70, 229, 1)',
        'rgba(99, 102, 241, 1)',
        'rgba(129, 140, 248, 1)',
      ],
      borderWidth: 1,
      borderRadius: 4, // Rounded bars
    },
  ],
})

const monthlySalesOptions = reactive({
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return '$' + value.toLocaleString()
        },
      },
    },
  },
})

// Data for Pie Chart
const categoryDistributionData = reactive({
  labels: ['Burgers', 'Sides', 'Drinks', 'Desserts', 'Breakfast'],
  datasets: [
    {
      label: 'Sales Volume',
      data: [300, 150, 100, 50, 75],
      backgroundColor: [
        'rgba(79, 70, 229, 0.8)', // indigo-600
        'rgba(234, 179, 8, 0.8)', // yellow-500
        'rgba(16, 185, 129, 0.8)', // emerald-500
        'rgba(239, 68, 68, 0.8)', // red-500
        'rgba(139, 92, 246, 0.8)', // violet-500
      ],
      borderColor: '#ffffff', // White borders between segments
      borderWidth: 2,
    },
  ],
})

const categoryDistributionOptions = reactive({
  plugins: {
    legend: {
      position: 'right', // Place legend on the right
      labels: {
        usePointStyle: true, // Use colored circles for legend
      },
    },
    title: {
      display: false,
    },
  },
})

// Data for Line Graph
const customerGrowthData = reactive({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'New Customers',
      data: [50, 75, 60, 90, 80, 110],
      fill: true,
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // blue-500 with opacity
      borderColor: 'rgb(59, 130, 246)', // blue-500
      tension: 0.4, // Smooth curve
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(59, 130, 246)',
    },
  ],
})

const customerGrowthOptions = reactive({
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0, // No decimal places for customer count
      },
    },
  },
})
</script>

<style scoped>
/* No specific scoped styles needed, as ChartComponent handles its canvas styling. */
</style>
