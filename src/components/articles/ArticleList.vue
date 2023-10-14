<script setup lang="ts">
import ArticleCard from '@/components/articles/ArticleCard.vue'
import type { Post } from '@/types/blogTypes'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps({
  posts: {
    type: Array as () => Post[],
    default: () => [],
  },

})
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="grid gap-8 lg:grid-cols-2">
      <ArticleCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </section>
</template>
