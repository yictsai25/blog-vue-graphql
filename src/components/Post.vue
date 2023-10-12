<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
query getPost {
  post(id: 1) {
    id
    title
    body
    user {
      id
      name
      email
    }
  }
}`)
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
                <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{{ result?.post.user.name }}</a>
                <p class="text-base text-gray-500 dark:text-gray-400">
                  {{ result?.post.user.email }}
                </p>
              </div>
            </div>
          </address>
          <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
            {{ result?.post.title }}
          </h1>
        </header>
        <p>
          {{ result?.post.body }}
        </p>
      </article>
    </div>
  </main>
</template>
