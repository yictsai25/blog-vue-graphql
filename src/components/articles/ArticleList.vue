<script setup lang="ts">
import ArticleCard from '@/components/articles/ArticleCard.vue'
import type { Post } from '@/graphql/generated/graphql'

const _props = defineProps<{
  posts: Post[]
}>()
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="grid gap-8 lg:grid-cols-2">
      <ArticleCard v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </section>
</template>
