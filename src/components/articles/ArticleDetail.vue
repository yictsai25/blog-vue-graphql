<script setup lang="ts">
import { computed, toRefs } from 'vue'
import type { Comment, Post } from '@/graphql/generated/graphql'
import ArticleCommentList from '@/components/articles/ArticleCommentList.vue'

const props = defineProps<{
  post: Post
}>()

const { post } = toRefs(props)
const comments = computed(() => (post.value?.comments?.data ?? []) as Comment[])
</script>

<template>
  <main class="pt-8 pb-16 lg:pt-16 lg:pb-24">
    <div class="flex justify-between px-4 mx-auto max-w-screen-xl">
      <article
        class="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert"
      >
        <header class="mb-4 lg:mb-6 not-format">
          <address class="flex items-center mb-6 not-italic">
            <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
              <div>
                <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{{ post.user?.name }}</a>
                <p class="text-base text-gray-500 dark:text-gray-400">
                  {{ post.user?.email }}
                </p>
              </div>
            </div>
          </address>
          <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {{ post.title }}
          </h1>
        </header>
        <p>
          {{ post.body }}
        </p>
      </article>
    </div>
    <ArticleCommentList :comments="comments" />
  </main>
</template>
