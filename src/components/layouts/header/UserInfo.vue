<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// eslint-disable-next-line unused-imports/no-unused-vars
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger aria-label="Open user menu">
      <button
        id="user-menu-button"
        type="button"
        class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0"
      >
        <span class="sr-only">Open user menu</span>
        <span class="bg-background dark:bg-gray-800 text-gray-950 dark:text-blue-50">
          <svg width="30px" height="30px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 5.5C5 4.11929 6.11929 3 7.5 3C8.88071 3 10 4.11929 10 5.5C10 6.88071 8.88071 8 7.5 8C6.11929 8 5 6.88071 5 5.5Z" fill="currentColor" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0ZM1 7.5C1 3.91015 3.91015 1 7.5 1C11.0899 1 14 3.91015 14 7.5C14 9.34956 13.2275 11.0187 11.9875 12.2024C11.8365 10.4086 10.3328 9 8.5 9H6.5C4.66724 9 3.16345 10.4086 3.01247 12.2024C1.77251 11.0187 1 9.34956 1 7.5Z" fill="currentColor" />
          </svg>
        </span>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <!-- Dropdown menu -->
      <div class="py-3 px-4">
        <span
          class="block text-sm font-semibold text-gray-900 dark:text-white"
        >{{ userName }}</span>
        <span
          class="block text-sm text-gray-900 truncate dark:text-white"
        >{{ userEmail }}</span>
      </div>
      <ul
        class="py-1 text-gray-700 dark:text-gray-300"
        aria-labelledby="dropdown"
      >
        <li>
          <a
            href="#"
            class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >Sign out</a>
        </li>
      </ul>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<style scoped>

</style>
