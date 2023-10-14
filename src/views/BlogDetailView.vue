<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(route.params.id)
</script>

<template>
  <div>Blog Post with ID: {{ id }}</div>
</template>

<style scoped>

</style>
