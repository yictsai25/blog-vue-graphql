<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
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
import { SortOrderEnum } from '@/graphql/generated/graphql'

const props = defineProps<{
  keyword?: string
}>()

const { keyword } = toRefs(props)

function sanitizeKeyword(inputKeyword: string | undefined): string {
  if (!inputKeyword)
    return ''

  // 只允許英文、數字、底線、減號、空白
  let sanitized = inputKeyword.replace(/[^a-zA-Z0-9\-_ ]/g, '')

  // 避免 DoS 攻擊或其他可能的問題，限制長度 100
  const maxLength = 100
  if (sanitized.length > maxLength)
    sanitized = sanitized.substring(0, maxLength)

  return sanitized
}

const sanitizedKeyword = computed(() => {
  return sanitizeKeyword(keyword?.value)
})

const defaultPage = 1
const currentPage = ref<number>(defaultPage)
const limit = ref<number>(8)

const { result, loading, error } = useQuery(gqlGetPostsPerPage, () => ({
  options: {
    paginate: {
      page: currentPage.value,
      limit: limit.value,
    },
    search: {
      q: sanitizedKeyword.value,
    },
    sort: [{
      field: 'id',
      order: SortOrderEnum.Desc,
    }],
  },
}))

const posts = computed(() => (result.value?.posts?.data ?? []) as Post[])
const totalCount = computed(() => result.value?.posts?.meta?.totalCount ?? 0)
</script>

<template>
  <div
    v-if="sanitizedKeyword"
    class="flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
    role="alert"
  >
    <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
    <div class="ml-3 text-sm">
      以下是&nbsp;<span class="font-semibold text-gray-800 dark:text-gray-400">{{ sanitizedKeyword }}</span>&nbsp;的搜尋結果
      <span class="sr-only">Search KeyWord</span>
    </div>
  </div>
  <div v-else>
    <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <span class="sr-only">Info</span>
      <div>
        <span class="font-medium">未輸入關鍵字</span>
      </div>
    </div>
  </div>

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
  <Pagination
    v-slot="{ page }" :total="totalCount" :items-per-page="limit" :sibling-count="1" show-edges
    :default-page="defaultPage" class="mt-8"
  >
    <PaginationList v-slot="{ items }" class="flex items-center justify-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            class="w-10 h-10 p-0" :variant="item.value === page ? 'default' : 'outline'"
            @click.prevent="currentPage = item.value"
          >
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
