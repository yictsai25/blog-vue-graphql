<script setup lang="ts">
import { toRefs } from 'vue'
import type { Comment } from '@/graphql/generated/graphql'

const props = defineProps<{
  comment: Comment
}>()

const { comment } = toRefs(props)
</script>

<template>
  <article class="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <footer class="flex justify-between items-center mb-2">
      <div class="flex items-center">
        <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
          {{ comment.name }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ comment.email }}
        </p>
      </div>
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      {{ comment.body }}
    </p>
  </article>
</template>
