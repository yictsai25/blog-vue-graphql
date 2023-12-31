<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gqlGetPost } from '@/graphql/queries'

import NotFound from '@/components/layouts/NotFound.vue'
import ArticleDetail from '@/components/articles/ArticleDetail.vue'

const route = useRoute()
const variables = reactive({
  postId: route.params.id as string,
})

watch(
  () => route.params.id,
  (newId) => {
    variables.postId = newId as string
  },
)

const { result, loading, error } = useQuery(gqlGetPost, { postId: route.params.id as string })
const post = computed(() => (result.value?.post))
</script>

<template>
  <div v-if="loading">
    <div role="status" class="max-w-sm animate-pulse">
      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
      <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <div v-else-if="error">
    <p>Error: {{ error.message }}</p>
  </div>
  <div v-else-if="!post">
    <NotFound />
  </div>
  <div v-else>
    <ArticleDetail :post="post" />
  </div>
</template>
