<script setup lang="ts">
import { toRefs } from 'vue'
import type { Post } from '@/graphql/generated/graphql'

const props = defineProps<{
  post: Post
}>()

const { post } = toRefs(props)
</script>

<template>
  <article
    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      <RouterLink :to="{ name: 'blog-detail', params: { id: post.id } }">
        {{
          post.title
        }}
      </RouterLink>
    </h2>
    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
      {{ post.body }}
    </p>
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <span class="font-medium dark:text-white">
          {{ post.user?.name }}
        </span>
      </div>
      <RouterLink
        :to="{ name: 'blog-detail', params: { id: post.id } }"
        class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline"
      >
        Read more
        <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </RouterLink>
    </div>
  </article>
</template>
