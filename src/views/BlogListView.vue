<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import ArticleList from '@/components/articles/ArticleList.vue'

const gqlGetAllPosts = gql`
query getAllPost {
  posts {
    data {
      id
      title
      body
      user {
        id
        name
        email
      }
      comments {
        data {
          id
          name
          email
          body
        }
      }
    }
  }
}
`

const { result, loading, error } = useQuery(gqlGetAllPosts)

const posts = computed(() => (result.value?.posts?.data ?? []))
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
  <div v-else>
    <ArticleList :posts="posts" />
  </div>
</template>
