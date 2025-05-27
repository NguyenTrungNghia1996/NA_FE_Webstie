<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Main Content (2/3 width) -->
      <main class="lg:w-2/3">
        <!-- Article Card -->
        <article class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
          <!-- Article Header -->
          <div class="p-6 sm:p-8">
            <div class="flex items-center text-sm text-gray-500  mb-2">
              <span>{{ props.data.create_date }}</span>
            </div>
            <h1 class="text-3xl sm:text-4xl font-bold text-gray-900  mb-4 leading-tight">
              {{ props.data.title }}
            </h1>
            <p class="text-lg text-gray-600  mb-6">
              {{ props.data.short_description }}
            </p>
          </div>

          <!-- Featured Image (optional) -->
          <NuxtImg v-if="props.data.image" :src="props.data.image" :alt="props.data.title" placeholder="/placeholder.png" class="w-full object-fill items-center p-5" />
          <!-- Article Content -->
          <div class="px-6 sm:px-8 pb-8 prose prose-lg max-w-none prose-headings:text-gray-900  prose-p:text-gray-700  prose-a:text-blue-600  prose-strong:text-gray-900 prose-ul:list-disc prose-ol:list-decimal ">
            <div v-html="props.data.description"></div>
          </div>
        </article>
      </main>

      <!-- Sidebar (1/3 width) -->
      <aside class="lg:w-1/3 space-y-6">
        <!-- Sticky sidebar container -->
        <div class="sticky top-6 space-y-6">
          <!-- Featured Posts -->
          <Featured class="bg-white rounded-xl shadow-md p-6" :type="props.data.type" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      title: "",
      create_date: "",
      short_description: "",
      description: "",
      image: "",
    }),
  },
});
</script>
