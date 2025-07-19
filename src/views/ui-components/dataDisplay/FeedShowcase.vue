<template>
  <div class="p-6">
    <h2 class="text-2xl font-semibold text-gray-800 mt-0 mb-6">Feed Components</h2>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Variant 1: Simple Activity Feed -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <FeedItem
            icon="shopping-cart"
            icon-color="indigo-600"
            message="<span class='font-medium'>John Doe</span> created a new order <span class='font-bold'>#ORD456</span> for 3 items."
            timestamp="Just now"
            bg-color="gray-50"
          />
          <FeedItem
            icon="package-check"
            icon-color="green-600"
            message="<span class='font-medium'>Inventory Team</span> received new stock for <span class='font-bold'>&quot;Beef Patties&quot;</span>."
            timestamp="15 minutes ago"
            bg-color="gray-50"
          />
          <FeedItem
            icon="bell"
            icon-color="red-600"
            message="<span class='font-bold'>Low stock alert</span> for <span class='font-medium'>&quot;Sesame Seed Buns&quot;</span>."
            timestamp="1 hour ago"
            bg-color="gray-50"
          />
          <FeedItem
            icon="users"
            icon-color="purple-600"
            message="<span class='font-medium'>Sarah Lee</span> updated her profile information."
            timestamp="3 hours ago"
            bg-color="gray-50"
          />
        </div>
      </section>

      <!-- Variant 2: Card-based News/Update Feed -->
      <section class="bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Company Updates</h3>
        <div class="space-y-6">
          <FeedCard
            image-src="https://placehold.co/600x400/E0F2FE/000?text=Event"
            image-alt="Company Event"
            title="Upcoming Summer BBQ Event!"
            description="Join us next month for our annual company BBQ! Get ready for delicious food, fun games, and great company."
            :metadata="[
              { icon: 'calendar', text: 'July 25, 2025' },
              { icon: 'map-pin', text: 'Central Park' },
            ]"
            link-href="#"
            link-text="Read More"
          />
          <FeedCard
            image-src="https://placehold.co/600x400/DBEAFE/000?text=Announcement"
            image-alt="New Policy Announcement"
            title="New Waste Reduction Policy Implemented"
            description="We're proud to announce new initiatives to reduce food waste and improve our environmental impact."
            :metadata="[
              { icon: 'leaf', text: 'Sustainability' },
              { icon: 'clock', text: '2 days ago' },
            ]"
            link-href="#"
            link-text="Learn More"
          />
        </div>
      </section>

      <!-- Variant 3: Notification Feed (Compact) -->
      <section class="bg-white p-6 rounded-xl shadow-md col-span-full">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Notifications</h3>
        <div class="space-y-3">
          <FeedItem
            icon="alert-circle"
            icon-color="red-500"
            message="Your account password expires in 7 days. <a href='#' class='text-indigo-600 hover:underline font-medium'>Update now</a>."
            timestamp="5 minutes ago"
            bg-color="white"
            text-color="gray-800"
            class="border-b border-gray-200 pb-3"
          />
          <FeedItem
            icon="info"
            icon-color="blue-500"
            message="There's a new software update available. <a href='#' class='text-indigo-600 hover:underline font-medium'>Install update</a>."
            timestamp="1 hour ago"
            bg-color="white"
            text-color="gray-800"
            class="border-b border-gray-200 pb-3"
          />
          <FeedItem
            icon="check-circle"
            icon-color="green-500"
            message="Your monthly report has been generated. <a href='#' class='text-indigo-600 hover:underline font-medium'>View report</a>."
            timestamp="Yesterday"
            bg-color="white"
            text-color="gray-800"
            class="pb-0"
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
          <code>&lt;FeedItem&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;FeedItem&gt;</code> component is designed for displaying single lines of
          activity or notifications, typically used in a list or timeline format.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>icon</code> (String, required): The Lucide icon name to display (e.g.,
            'shopping-cart', 'bell').
          </li>
          <li>
            <code>iconColor</code> (String, default: 'text-gray-600'): Tailwind CSS class for the
            icon color (e.g., 'indigo-600', 'red-500').
          </li>
          <li>
            <code>message</code> (String, required): The main text content of the feed item. HTML
            can be used for formatting (e.g., `&lt;span&gt;` for bold/medium text, `&lt;a&gt;` for
            links).
          </li>
          <li>
            <code>timestamp</code> (String, required): A short string indicating when the activity
            occurred (e.g., 'Just now', '1 hour ago').
          </li>
          <li>
            <code>bgColor</code> (String, default: 'bg-gray-50'): Tailwind CSS class for the
            background color of the feed item (e.g., 'bg-gray-50', 'bg-white').
          </li>
          <li>
            <code>textColor</code> (String, default: 'text-gray-800'): Tailwind CSS class for the
            main message text color.
          </li>
        </ul>
      </div>

      <div class="mb-8 mt-8">
        <h4 class="text-xl font-medium text-gray-700 mb-3">
          <code>&lt;FeedCard&gt;</code> Component
        </h4>
        <p class="text-gray-600 mb-2">
          The <code>&lt;FeedCard&gt;</code> component is suitable for displaying richer content
          updates like news articles or company announcements, often featuring an image and multiple
          metadata tags.
        </p>
        <h5 class="text-lg font-medium text-gray-700 mb-2">Props:</h5>
        <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
          <li>
            <code>imageSrc</code> (String, default: null): URL for the card's image. Optional.
          </li>
          <li>
            <code>imageAlt</code> (String, default: 'Card Image'): Alt text for the image, important
            for accessibility.
          </li>
          <li><code>title</code> (String, required): The main title of the card.</li>
          <li>
            <code>description</code> (String, required): The main text content/summary of the card.
          </li>
          <li>
            <code>metadata</code> (Array, default: <code>[]</code>): An array of objects, each
            representing a piece of metadata. Each object should have:
            <ul class="list-circle list-inside ml-6 mt-1">
              <li>`icon` (String, optional): Lucide icon name (e.g., 'calendar', 'map-pin').</li>
              <li>`text` (String, required): The metadata text (e.g., 'July 25, 2025').</li>
            </ul>
          </li>
          <li>
            <code>linkHref</code> (String, default: null): The URL for the "Read More" or "Learn
            More" link. If `null`, no link is displayed.
          </li>
          <li>
            <code>linkText</code> (String, default: 'Read More'): The text for the action link.
          </li>
          <li>
            <code>linkTarget</code> (String, default: '_self'): The target attribute for the link
            (e.g., '_blank' for new tab).
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FeedItem, FeedCard } from '@/components/dataDisplay' // Import from new dataDisplay folder
</script>

<style scoped>
/* No specific scoped styles needed, as this component primarily relies on Tailwind classes
   and the FeedItem/FeedCard components' own scoped styles. */
</style>
