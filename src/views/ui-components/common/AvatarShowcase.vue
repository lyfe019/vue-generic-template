<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Avatar Components</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Standard Circular Avatars -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Standard Circular Avatars</h3>
        <div class="flex flex-wrap items-center gap-6">
          <Avatar src="https://placehold.co/100x100/A0AEC0/ffffff?text=U1" alt="User 1" size="sm" />
          <Avatar src="https://placehold.co/100x100/FBD38D/000000?text=U2" alt="User 2" size="md" />
          <Avatar src="https://placehold.co/100x100/9F7AEA/ffffff?text=U3" alt="User 3" size="lg" />
          <Avatar src="https://placehold.co/100x100/6B46C1/ffffff?text=U4" alt="User 4" size="xl" />
        </div>
      </section>

      <!-- Avatars with Badges (Status Indicators) -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Avatars with Status Badges</h3>
        <div class="flex flex-wrap items-center gap-8">
          <Avatar
            src="https://placehold.co/100x100/63B3ED/ffffff?text=U5"
            alt="User 5"
            size="lg"
            status="online"
          />
          <Avatar
            src="https://placehold.co/100x100/F6AD55/000000?text=U6"
            alt="User 6"
            size="lg"
            status="offline"
          />
          <Avatar
            src="https://placehold.co/100x100/FC8181/ffffff?text=U7"
            alt="User 7"
            size="lg"
            status="away"
          />
          <Avatar
            src="https://placehold.co/100x100/48BB78/ffffff?text=U8"
            alt="User 8"
            size="lg"
            :notification-count="3"
          />
        </div>
      </section>

      <!-- Avatars with Initials/Placeholders -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Avatars with Initials / Placeholders
        </h3>
        <div class="flex flex-wrap items-center gap-6">
          <Avatar initials="JD" size="sm" color="blue-500" />
          <Avatar initials="AK" size="md" color="purple-500" />
          <Avatar initials="SM" size="lg" color="green-500" />
          <Avatar size="lg" color="gray-200" />
          <!-- Default icon placeholder -->
          <Avatar size="xl" color="gray-200" />
          <!-- Default icon placeholder -->
        </div>
      </section>

      <!-- Avatar Groups -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Avatar Groups</h3>
        <div class="flex items-center -space-x-4">
          <Avatar
            src="https://placehold.co/100x100/F7FAFC/2D3748?text=U1"
            alt="Avatar 1"
            size="lg"
            :has-ring="true"
          />
          <Avatar
            src="https://placehold.co/100x100/EDF2F7/4A5568?text=U2"
            alt="Avatar 2"
            size="lg"
            :has-ring="true"
          />
          <Avatar
            src="https://placehold.co/100x100/E2E8F0/718096?text=U3"
            alt="Avatar 3"
            size="lg"
            :has-ring="true"
          />
          <Avatar
            src="https://placehold.co/100x100/CBD5E0/A0AEC0?text=U4"
            alt="Avatar 4"
            size="lg"
            :has-ring="true"
          />
          <a
            class="flex items-center justify-center h-12 w-12 rounded-full bg-gray-200 text-gray-600 text-sm font-medium ring-2 ring-white hover:bg-gray-300"
            href="#"
          >
            +5
          </a>
        </div>
        <p class="mt-4 text-sm text-gray-600">Team members assigned to this project.</p>
      </section>
    </div>

    <hr class="my-10 border-gray-300" />

    <!-- Usage Specification Section -->
    <section class="bg-white p-6 rounded-xl shadow-md mt-8">
      <h3 class="text-2xl font-semibold text-gray-800 mb-4">Usage Specification</h3>

      <div class="mb-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;Avatar&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;Avatar&gt;</code> component is used to display user profile pictures,
          initials, or generic placeholder icons. It supports various sizes, status indicators, and
          notification badges.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>src</code> (String, default: null): The URL of the avatar image. If provided, the
            image will be displayed. Includes a fallback placeholder if the image fails to load.
          </li>
          <li>
            <code>alt</code> (String, default: 'User avatar'): Alternative text for the avatar
            image, important for accessibility.
          </li>
          <li>
            <code>initials</code> (String, default: null): If `src` is not provided, these initials
            (e.g., "JD", "SM") will be displayed within the avatar. Max 2-3 characters recommended
            for readability.
          </li>
          <li>
            <code>size</code> (String, default: 'md'): Controls the dimensions of the avatar.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'sm' (32x32px), 'md' (40x40px), 'lg' (48x48px), 'xl' (64x64px).
            </span>
          </li>
          <li>
            <code>color</code> (String, default: 'gray-200'): Applies a Tailwind background color
            class (e.g., 'blue-500', 'purple-500') to avatars displaying initials or a placeholder
            icon.
          </li>
          <li>
            <code>status</code> (String, default: null): Displays a small circular badge indicating
            user status.
            <br />
            <span class="font-mono text-sm text-gray-500">
              Valid values: 'online' (green), 'offline' (gray), 'away' (yellow).
            </span>
          </li>
          <li>
            <code>notificationCount</code> (Number, default: 0): Displays a small circular badge
            with a numerical count (e.g., unread messages). Only visible if `> 0`.
          </li>
          <li>
            <code>hasRing</code> (Boolean, default: false): If `true`, adds a `ring-2 ring-white`
            border around the avatar, useful for creating a layered effect in avatar groups.
          </li>
        </ul>

        <h5 class="text-lg font-medium text-gray-700 mt-4 mb-2">Basic Usage Examples:</h5>
        <pre class="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto"><code>&lt;template&gt;
  &lt;!-- Image avatar --&gt;
  &lt;Avatar src="/path/to/profile.jpg" alt="John Doe" size="lg" /&gt;

  &lt;!-- Initials avatar --&gt;
  &lt;Avatar initials="JS" size="md" color="indigo-600" /&gt;

  &lt;!-- Placeholder icon avatar (when no src or initials) --&gt;
  &lt;Avatar size="xl" color="blue-200" /&gt;

  &lt;!-- Avatar with online status --&gt;
  &lt;Avatar src="/path/to/user.jpg" status="online" size="md" /&gt;

  &lt;!-- Avatar with notification count --&gt;
  &lt;Avatar initials="LM" size="lg" color="green-500" :notification-count="7" /&gt;

  &lt;!-- Avatar for grouping --&gt;
  &lt;Avatar src="/path/to/team-member.jpg" size="lg" :has-ring="true" /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import { Avatar } from '@/components/common';
&lt;/script&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { Avatar } from '@/components/common' // Import the new Avatar component

// Ensure Lucide icons are rendered for the Icon component used within Avatar
// This is typically handled by the Icon component itself or a global setup.
// No direct lucide.createIcons() call needed here, as Avatar component encapsulates it for its internal Icon.
onMounted(() => {
  // If there are any other direct `data-lucide` tags outside of the Avatar component,
  // this would ensure they are rendered.
  // For componentized apps, this is usually handled once at the app's root.
  // Including it here for robustness in a showcase environment.
  setTimeout(() => {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  }, 100)
})
</script>

<style scoped>
/* No specific scoped CSS needed here, as it relies on Tailwind classes and the Avatar component. */
</style>
