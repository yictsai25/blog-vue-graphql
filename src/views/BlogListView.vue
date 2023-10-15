<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gqlGetPostsPerPage } from '@/graphql/queries'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import {
  Button,
} from '@/components/ui/button'
import ArticleList from '@/components/articles/ArticleList.vue'
import type { Post } from '@/graphql/generated/graphql'

const defaultPage = 1
const currentPage = ref(defaultPage)
const limit = ref(8)

const { result, loading, error } = useQuery(gqlGetPostsPerPage, () => ({
  options: {
    paginate: {
      page: currentPage.value,
      limit: limit.value,
    },
  },
}))

const posts = computed(() => (result.value?.posts?.data ?? []) as Post[])
const totalCount = computed(() => result.value?.posts?.meta?.totalCount ?? 0)
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
  <ArticleList v-else :posts="posts" />
  <Pagination v-slot="{ page }" :total="totalCount" :items-per-page="limit" :sibling-count="1" show-edges :default-page="defaultPage" class="mt-8">
    <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'" @click.prevent="currentPage = item.value">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
