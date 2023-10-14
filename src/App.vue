<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import Header from '@/components/layouts/header/Header.vue'
import Sidebar from '@/components/layouts/Sidebar.vue'

const isSidebarOpen = ref(false)
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div>
    <Header @toggle-sidebar="toggleSidebar" />
    <Sidebar :is-open="isSidebarOpen" />
    <main class="p-4 md:ml-64 h-auto pt-20">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
</style>
