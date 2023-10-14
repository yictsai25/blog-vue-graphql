<script setup lang="ts">
import ArticleComment from '@/components/articles/ArticleComment.vue'
import type { Comment } from '@/graphql/generated/graphql'

const _props = defineProps<{
  comments: Comment[]
}>()
</script>

<template>
  <section class="bg-white dark:bg-gray-900 py-8 lg:py-16">
    <div class="max-w-2xl mx-auto px-4">
      <ArticleComment v-for="(comment, index) in comments" :key="index" :comment="comment" />
    </div>
  </section>
</template>
