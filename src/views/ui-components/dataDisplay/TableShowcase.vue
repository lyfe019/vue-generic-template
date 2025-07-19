<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Table / Data Grid Components</h2>

    <div class="grid grid-cols-1 gap-8">
      <!-- Variant 1: Basic Inventory Table -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Basic Inventory Table</h3>
        <DataTable :headers="basicTableHeaders" :data="basicTableData" />
      </section>

      <!-- Variant 2: Striped & Hoverable Orders List -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Orders List (Striped & Hoverable)</h3>
        <DataTable :headers="ordersTableHeaders" :data="ordersTableData" striped hoverable>
          <template #item-status="{ item: status }">
            <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                status === 'Pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
              ]"
            >
              {{ status }}
            </span>
          </template>
          <template #actions="{ row }">
            <a
              href="#"
              @click.prevent="viewOrder(row.orderId)"
              class="text-blue-600 hover:text-blue-900 mr-3"
              >View</a
            >
            <a
              href="#"
              @click.prevent="cancelOrder(row.orderId)"
              class="text-red-600 hover:text-red-900"
              >Cancel</a
            >
          </template>
        </DataTable>
      </section>

      <!-- Variant 3: Sortable Customer Table -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Sortable Customer Table</h3>
        <DataTable :headers="customerTableHeaders" :data="customerTableData" sortable />
      </section>

      <!-- Variant 4: Table with Fixed Header & Scrollable Body -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Stock Movement History (Scrollable)
        </h3>
        <DataTable :headers="stockMovementHeaders" :data="stockMovementData" scrollable>
          <template #item-type="{ item: type }">
            <span :class="['text-sm', type === 'Inbound' ? 'text-green-600' : 'text-red-600']">
              {{ type }}
            </span>
          </template>
        </DataTable>
      </section>

      <!-- Variant 5: Table with Actions & Pagination -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Users Overview (with Actions & Pagination)
        </h3>
        <DataTable
          :headers="usersTableHeaders"
          :data="usersTableData"
          striped
          hoverable
          paginate
          :items-per-page="3"
        >
          <template #item-status="{ item: status }">
            <span
              :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                status === 'Active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800',
              ]"
            >
              {{ status }}
            </span>
          </template>
          <template #actions="{ row }">
            <button
              @click="editUser(row.userId)"
              class="text-indigo-600 hover:text-indigo-900 mr-2"
              aria-label="Edit User"
            >
              <Icon name="edit" class="w-4 h-4 inline-block" />
            </button>
            <button
              @click="deleteUser(row.userId)"
              class="text-red-600 hover:text-red-900"
              aria-label="Delete User"
            >
              <Icon name="trash-2" class="w-4 h-4 inline-block" />
            </button>
          </template>
        </DataTable>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;DataTable&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;DataTable&gt;</code> component is a versatile solution for displaying
          tabular data. It supports various configurations including basic display, striped rows,
          hover effects, sortable columns, fixed headers for scrollable content, and built-in
          pagination.
        </p>

        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>headers</code> (Array, required): An array of objects defining table columns. Each
            object should have:
            <ul class="list-disc list-inside text-gray-600 space-y-1 ml-6">
              <li><code>text</code> (String): The display text for the column header.</li>
              <li>
                <code>value</code> (String): The key from your `data` objects that corresponds to
                this column.
              </li>
              <li>
                <code>sortable</code> (Boolean, optional, default: <code>false</code>): If
                <code>true</code>, the column header will be clickable for sorting. Requires
                <code>sortable</code> prop on <code>&lt;DataTable&gt;</code> to be
                <code>true</code>.
              </li>
              <li>
                <code>isPrimary</code> (Boolean, optional, default: <code>false</code>): If
                <code>true</code>, applies <code>font-medium text-gray-900</code> to the cell for
                emphasis. Useful for ID or Name columns.
              </li>
              <li>
                <code>class</code> (String, optional): Custom Tailwind CSS classes to apply to both
                the header and data cells of this column.
              </li>
              <li>
                <code>align</code> ('left' | 'center' | 'right', optional, default: 'left'): Text
                alignment for the column.
              </li>
            </ul>
          </li>
          <li>
            <code>data</code> (Array, required): An array of objects, where each object represents a
            row in the table. Keys in the objects should match the <code>value</code> properties in
            your <code>headers</code>.
          </li>
          <li>
            <code>striped</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            applies alternating row background colors for better readability.
          </li>
          <li>
            <code>hoverable</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            rows will change background color on hover.
          </li>
          <li>
            <code>sortable</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            enables sorting functionality for columns marked <code>sortable: true</code> in the
            <code>headers</code> array.
          </li>
          <li>
            <code>initialSortKey</code> (String, default: <code>null</code>): The initial column key
            to sort by.
          </li>
          <li>
            <code>initialSortDirection</code> (String, default: <code>'asc'</code>): The initial
            sort direction ('asc' or 'desc').
          </li>
          <li>
            <code>scrollable</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            the table body will be scrollable with a fixed header (max height <code>h-72</code>).
          </li>
          <li>
            <code>paginate</code> (Boolean, default: <code>false</code>): If <code>true</code>,
            enables basic client-side pagination controls below the table.
          </li>
          <li>
            <code>itemsPerPage</code> (Number, default: <code>10</code>): Number of rows to display
            per page when pagination is enabled.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Slots:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>#item-{header.value}="{ item, row }"</code>: A dynamic slot for customizing the
            content of individual cells. Replace <code>{header.value}</code> with the
            <code>value</code> property of the header you want to customize (e.g.,
            <code>#item-status</code>).
            <br />
            <span class="font-mono text-sm text-gray-500">
              Receives <code>item</code> (the value of the current cell) and <code>row</code> (the
              entire row object).
            </span>
            <pre
              class="bg-gray-100 p-2 rounded text-sm mt-1"
            ><code>&lt;template #item-status="{ item }"&gt;
  &lt;span :class="..."&gt;&lbrace;&lbrace; item &rbrace;&rbrace;&lt;/span&gt;
&lt;/template&gt;</code></pre>
          </li>
          <li>
            <code>#actions="{ row }"</code>: A slot for defining actions (e.g., edit, delete
            buttons) in the last column. This slot is only rendered if provided.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Receives <code>row</code> (the entire row object).
            </span>
            <pre
              class="bg-gray-100 p-2 rounded text-sm mt-1"
            ><code>&lt;template #actions="{ row }"&gt;
  &lt;button @click="editItem(row.id)"&gt;Edit&lt;/button&gt;
&lt;/template&gt;</code></pre>
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Events:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>sort({ key, direction })</code>: Emitted when a sortable column header is clicked,
            providing the sort key and direction.
          </li>
          <li>
            <code>page-change(currentPage)</code>: Emitted when the pagination page changes,
            providing the new current page number.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Example:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;DataTable
    :headers="myHeaders"
    :data="myData"
    striped
    hoverable
    sortable
    paginate
    :items-per-page="5"
  &gt;
    &lt;template #item-status="{ item }"&gt;
      &lt;span v-if="item === 'active'" class="text-green-500"&gt;Active&lt;/span&gt;
      &lt;span v-else class="text-red-500"&gt;Inactive&lt;/span&gt;
    &lt;/template&gt;
    &lt;template #actions="{ row }"&gt;
      &lt;button @click="viewDetails(row.id)" class="text-blue-500"&gt;View&lt;/button&gt;
    &lt;/template&gt;
  &lt;/DataTable&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { ref } from 'vue';
import { DataTable } from '@/components/dataDisplay';

const myHeaders = ref([
  &lbrace;&lbrace; text: 'ID', value: 'id', isPrimary: true &rbrace;&rbrace;,
  &lbrace;&lbrace; text: 'Name', value: 'name', sortable: true &rbrace;&rbrace;,
  &lbrace;&lbrace; text: 'Status', value: 'status' &rbrace;&rbrace;,
]);

const myData = ref([
  &lbrace;&lbrace; id: 1, name: 'Item A', status: 'active' &rbrace;&rbrace;,
  &lbrace;&lbrace; id: 2, name: 'Item B', status: 'inactive' &rbrace;&rbrace;,
  &lbrace;&lbrace; id: 3, name: 'Item C', status: 'active' &rbrace;&rbrace;,
]);

const viewDetails = (id) => &lbrace;&lbrace;
  console.log('View details for:', id);
&rbrace;&rbrace;;
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DataTable } from '@/components/dataDisplay'
import { Icon } from '@/components/common' // Ensure Icon is imported if used in slots

// Dummy Data for Variants
const basicTableHeaders = ref([
  { text: 'Product Name', value: 'productName', isPrimary: true },
  { text: 'Category', value: 'category' },
  { text: 'Stock', value: 'stock', align: 'right' },
  { text: 'Price', value: 'price', align: 'right' },
])
const basicTableData = ref([
  { productName: 'Classic Burger Patty', category: 'Meats', stock: 250, price: '$1.50' },
  { productName: 'Sesame Seed Buns', category: 'Bakery', stock: 500, price: '$0.25' },
  { productName: 'Fresh Lettuce (per kg)', category: 'Produce', stock: 30, price: '$2.00' },
])

const ordersTableHeaders = ref([
  { text: 'Order ID', value: 'orderId', isPrimary: true },
  { text: 'Customer', value: 'customer' },
  { text: 'Total', value: 'total', align: 'right' },
  { text: 'Status', value: 'status' },
])
const ordersTableData = ref([
  { orderId: '#ORD001', customer: 'Alice Smith', total: '$25.50', status: 'Pending' },
  { orderId: '#ORD002', customer: 'Bob Johnson', total: '$12.00', status: 'Completed' },
  { orderId: '#ORD003', customer: 'Charlie Brown', total: '$38.75', status: 'Cancelled' },
])

const customerTableHeaders = ref([
  { text: 'Name', value: 'name', sortable: true, isPrimary: true },
  { text: 'Email', value: 'email', sortable: true },
  { text: 'Joined Date', value: 'joinedDate', sortable: true },
])
const customerTableData = ref([
  { name: 'Jane Doe', email: 'jane.doe@example.com', joinedDate: '2024-01-15' },
  { name: 'Peter Jones', email: 'peter.j@example.com', joinedDate: '2023-11-20' },
  { name: 'Alice Brown', email: 'alice.b@example.com', joinedDate: '2024-03-01' },
  { name: 'Charlie Davis', email: 'charlie.d@example.com', joinedDate: '2023-09-10' },
])

const stockMovementHeaders = ref([
  { text: 'Date', value: 'date', isPrimary: true },
  { text: 'Item', value: 'item' },
  { text: 'Type', value: 'type' },
  { text: 'Qty', value: 'qty', align: 'right' },
  { text: 'By', value: 'by' },
])
const stockMovementData = ref([
  { date: '2024-07-20', item: 'Burger Buns', type: 'Inbound', qty: '+100', by: 'Warehouse' },
  { date: '2024-07-20', item: 'Beef Patties', type: 'Outbound', qty: '-50', by: 'Sales' },
  { date: '2024-07-19', item: 'Cheese Slices', type: 'Inbound', qty: '+200', by: 'Supplier' },
  { date: '2024-07-19', item: 'Lettuce', type: 'Outbound', qty: '-10', by: 'Kitchen' },
  { date: '2024-07-18', item: 'Tomatoes', type: 'Outbound', qty: '-5', by: 'Kitchen' },
  { date: '2024-07-18', item: 'Fries (frozen)', type: 'Inbound', qty: '+50', by: 'Supplier' },
  { date: '2024-07-17', item: 'Soda Syrup', type: 'Outbound', qty: '-2', by: 'Sales' },
  { date: '2024-07-17', item: 'Onion Rings', type: 'Inbound', qty: '+75', by: 'Warehouse' },
  { date: '2024-07-16', item: 'Pickles', type: 'Outbound', qty: '-8', by: 'Kitchen' },
  { date: '2024-07-16', item: 'Chicken Fillets', type: 'Inbound', qty: '+150', by: 'Supplier' },
  { date: '2024-07-15', item: 'Ketchup Sachets', type: 'Outbound', qty: '-200', by: 'Sales' },
  { date: '2024-07-14', item: 'Mustard Bottles', type: 'Inbound', qty: '+30', by: 'Warehouse' },
  { date: '2024-07-13', item: 'Paper Bags', type: 'Outbound', qty: '-100', by: 'Sales' },
  { date: '2024-07-12', item: 'Disposable Cups', type: 'Inbound', qty: '+500', by: 'Supplier' },
  { date: '2024-07-11', item: 'Napkins', type: 'Outbound', qty: '-150', by: 'Kitchen' },
])

const usersTableHeaders = ref([
  { text: 'User ID', value: 'userId', isPrimary: true },
  { text: 'Name', value: 'name', sortable: true },
  { text: 'Role', value: 'role' },
  { text: 'Status', value: 'status' },
])
const usersTableData = ref([
  { userId: 'USR001', name: 'John Smith', role: 'Administrator', status: 'Active' },
  { userId: 'USR002', name: 'Jane Doe', role: 'Manager', status: 'Active' },
  { userId: 'USR003', name: 'Emily White', role: 'Staff', status: 'Inactive' },
  { userId: 'USR004', name: 'David Lee', role: 'Staff', status: 'Active' },
  { userId: 'USR005', name: 'Sarah Chen', role: 'Manager', status: 'Active' },
  { userId: 'USR006', name: 'Michael Brown', role: 'Staff', status: 'Inactive' },
  { userId: 'USR007', name: 'Jessica Davis', role: 'Administrator', status: 'Active' },
])

// Action Handlers for showcase
const viewOrder = (orderId) => {
  console.log('Viewing order:', orderId)
  // Implement navigation or modal for order details
}

const cancelOrder = (orderId) => {
  console.log('Cancelling order:', orderId)
  // Implement logic to change order status
}

const editUser = (userId) => {
  console.log('Editing user:', userId)
  // Implement navigation or modal for user edit form
}

const deleteUser = (userId) => {
  console.log('Deleting user:', userId)
  // Implement confirmation dialog and deletion logic
}
</script>

<style scoped>
/* No specific scoped styles needed for the showcase,
   as the DataTable component contains its own styles. */
</style>
